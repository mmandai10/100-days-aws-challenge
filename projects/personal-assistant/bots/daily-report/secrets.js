// secrets.js - AWS Secrets Manager からシークレット取得
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'ap-northeast-1' });

// 環境変数からシークレット名を取得
const GITHUB_TOKEN_SECRET = process.env.GITHUB_TOKEN_SECRET_NAME;
const ANTHROPIC_API_KEY_SECRET = process.env.ANTHROPIC_API_KEY_SECRET_NAME;
const SLACK_WEBHOOK_SECRET = process.env.SLACK_WEBHOOK_SECRET_NAME;

async function getSecretValue(secretName) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return response.SecretString;
}

export async function getSecrets() {
  const [githubToken, anthropicApiKey, slackWebhook] = await Promise.all([
    getSecretValue(GITHUB_TOKEN_SECRET),
    getSecretValue(ANTHROPIC_API_KEY_SECRET),
    SLACK_WEBHOOK_SECRET ? getSecretValue(SLACK_WEBHOOK_SECRET) : null
  ]);

  return {
    githubToken,
    anthropicApiKey,
    slackWebhook
  };
}
