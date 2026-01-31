import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

const KNOWLEDGE_BASE_ID = process.env.KNOWLEDGE_BASE_ID || "SDTDA89LQD";
const MODEL_ARN = process.env.MODEL_ARN || 
  "arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1:0";

// CORS ヘッダー
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // CORS プリフライト
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    // リクエストボディをパース
    const body = JSON.parse(event.body || "{}");
    const question = body.question;

    if (!question) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "question is required" }),
      };
    }

    // Knowledge Bases に問い合わせ
    const command = new RetrieveAndGenerateCommand({
      input: { text: question },
      retrieveAndGenerateConfiguration: {
        type: "KNOWLEDGE_BASE",
        knowledgeBaseConfiguration: {
          knowledgeBaseId: KNOWLEDGE_BASE_ID,
          modelArn: MODEL_ARN,
        },
      },
    });

    const response = await client.send(command);

    // 回答テキスト
    const answer = response.output?.text || "回答を生成できませんでした";

    // 出典情報を抽出
    const sources: string[] = [];
    if (response.citations) {
      for (const citation of response.citations) {
        if (citation.retrievedReferences) {
          for (const ref of citation.retrievedReferences) {
            const uri = ref.location?.s3Location?.uri;
            if (uri) {
              const fileName = uri.split("/").pop() || uri;
              if (!sources.includes(fileName)) {
                sources.push(fileName);
              }
            }
          }
        }
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        answer,
        sources,
        sessionId: response.sessionId,
      }),
    };
  } catch (error: any) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
