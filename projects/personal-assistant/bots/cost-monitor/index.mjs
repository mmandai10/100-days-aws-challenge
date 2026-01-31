// Cost Monitor Bot
// EventBridge (毎朝) → Cost Explorer API → Claude分析 → SES通知

import {
  CostExplorerClient,
  GetCostAndUsageCommand,
} from "@aws-sdk/client-cost-explorer";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Cost Explorer は us-east-1 のみ
const ceClient = new CostExplorerClient({ region: "us-east-1" });
const secretsClient = new SecretsManagerClient({ region: "ap-northeast-1" });
const sesClient = new SESClient({ region: "ap-northeast-1" });

// 日付ヘルパー（YYYY-MM-DD 形式）
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getDateRange() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  return {
    today: formatDate(today),
    yesterday: formatDate(yesterday),
    twoDaysAgo: formatDate(twoDaysAgo),
    threeDaysAgo: formatDate(threeDaysAgo),
  };
}

// Cost Explorer API でコスト取得
async function getCosts(startDate, endDate) {
  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: startDate,
      End: endDate,
    },
    Granularity: "DAILY",
    Metrics: ["UnblendedCost"],
    GroupBy: [
      {
        Type: "DIMENSION",
        Key: "SERVICE",
      },
    ],
  });

  const response = await ceClient.send(command);
  return response.ResultsByTime;
}

// コストデータを整形
function formatCostData(results) {
  return results.map((day) => {
    const date = day.TimePeriod.Start;
    const services = day.Groups.map((g) => ({
      service: g.Keys[0],
      cost: parseFloat(g.Metrics.UnblendedCost.Amount).toFixed(4),
    }))
      .filter((s) => parseFloat(s.cost) > 0)
      .sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));

    const total = services
      .reduce((sum, s) => sum + parseFloat(s.cost), 0)
      .toFixed(4);

    return { date, total, services };
  });
}

// 異常検知（前日比 50% 以上増加で警告）
function detectAnomaly(costData) {
  if (costData.length < 2) return { isAnomaly: false };

  const latest = parseFloat(costData[0].total);
  const previous = parseFloat(costData[1].total);

  if (previous === 0) {
    return {
      isAnomaly: latest > 0.5, // 前日0で今日0.5ドル以上なら警告
      changePercent: latest > 0 ? "N/A (前日 $0)" : "0%",
      latest,
      previous,
    };
  }

  const changePercent = ((latest - previous) / previous) * 100;
  return {
    isAnomaly: changePercent > 50,
    changePercent: changePercent.toFixed(1) + "%",
    latest,
    previous,
  };
}

// Claude API でコスト分析
async function analyzeWithClaude(costData, anomaly) {
  const secretName = process.env.CLAUDE_API_KEY_SECRET_NAME;
  if (!secretName) {
    return "Claude API Key が設定されていません";
  }

  try {
    const secretResponse = await secretsClient.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );
    const apiKey = secretResponse.SecretString;

    const prompt = `あなたは AWS コスト分析の専門家です。以下のコストデータを分析し、日本語でレポートを作成してください。

## コストデータ
${JSON.stringify(costData, null, 2)}

## 異常検知結果
${JSON.stringify(anomaly, null, 2)}

## レポート要件
1. 概要（直近のコスト状況を1-2文で）
2. サービス別分析（コストが高いサービスについてコメント）
3. ${anomaly.isAnomaly ? "【警告】コスト急増の原因と対策" : "トレンド分析"}
4. 推奨アクション（あれば）

簡潔に、箇条書きで回答してください。`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.content?.[0]?.text || "分析結果を取得できませんでした";
  } catch (error) {
    console.error("Claude API error:", error);
    return `Claude 分析エラー: ${error.message}`;
  }
}

// SES でメール送信
async function sendEmail(subject, body) {
  const toAddress = process.env.NOTIFICATION_EMAIL;
  if (!toAddress) {
    console.log("NOTIFICATION_EMAIL not set, skipping email");
    return null;
  }

  const command = new SendEmailCommand({
    Source: toAddress,
    Destination: { ToAddresses: [toAddress] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: { Text: { Data: body, Charset: "UTF-8" } },
    },
  });

  return sesClient.send(command);
}

// メインハンドラー
export const handler = async (event) => {
  console.log("Cost Monitor Bot started");
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    // 1. 日付範囲を計算（過去2日分）
    const dates = getDateRange();
    console.log("Date range:", dates);

    // 2. Cost Explorer API でコスト取得
    const results = await getCosts(dates.threeDaysAgo, dates.today);
    console.log("Raw results:", JSON.stringify(results, null, 2));

    // 3. データ整形
    const costData = formatCostData(results);
    console.log("Formatted cost data:", JSON.stringify(costData, null, 2));

    // 4. 異常検知
    const anomaly = detectAnomaly(costData);
    console.log("Anomaly detection:", anomaly);

    // 5. Claude で分析
    const analysis = await analyzeWithClaude(costData, anomaly);
    console.log("Claude analysis:", analysis);

    // 6. メール送信
    const subject = anomaly.isAnomaly
      ? `[警告] AWS コスト急増検知 - ${dates.yesterday}`
      : `[日次] AWS コストレポート - ${dates.yesterday}`;

    const emailBody = `
AWS コストレポート
==================
日付: ${dates.yesterday}
合計: $${costData[0]?.total || "N/A"}
前日比: ${anomaly.changePercent}
${anomaly.isAnomaly ? "\n⚠️ コスト急増を検知しました！\n" : ""}

--- サービス別内訳 ---
${
  costData[0]?.services
    .map((s) => `${s.service}: $${s.cost}`)
    .join("\n") || "データなし"
}

--- AI 分析 ---
${analysis}

--
Personal Assistant - Cost Monitor Bot
`;

    await sendEmail(subject, emailBody);
    console.log("Email sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Cost report generated",
        date: dates.yesterday,
        totalCost: costData[0]?.total,
        anomaly: anomaly.isAnomaly,
        analysis: analysis,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
