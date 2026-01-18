// テストユーザー10名を作成するスクリプト
const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-1' });
const USER_POOL_ID = 'ap-northeast-1_4iMusxkT9';

const testUsers = [
  { name: 'tanaka.taro', email: 'tanaka.taro@example.com' },
  { name: 'yamada.hanako', email: 'yamada.hanako@example.com' },
  { name: 'suzuki.ichiro', email: 'suzuki.ichiro@example.com' },
  { name: 'sato.yuki', email: 'sato.yuki@example.com' },
  { name: 'takahashi.ken', email: 'takahashi.ken@example.com' },
  { name: 'watanabe.mai', email: 'watanabe.mai@example.com' },
  { name: 'ito.daiki', email: 'ito.daiki@example.com' },
  { name: 'nakamura.sakura', email: 'nakamura.sakura@example.com' },
  { name: 'kobayashi.ryo', email: 'kobayashi.ryo@example.com' },
  { name: 'kato.mika', email: 'kato.mika@example.com' },
];

const PASSWORD = 'TestPass123';  // 共通パスワード

async function createTestUsers() {
  for (const user of testUsers) {
    try {
      // ユーザー作成
      await client.send(new AdminCreateUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: user.email,
        UserAttributes: [
          { Name: 'email', Value: user.email },
          { Name: 'email_verified', Value: 'true' },
        ],
        MessageAction: 'SUPPRESS',  // 招待メールを送らない
      }));
      
      // パスワード設定（永続的に）
      await client.send(new AdminSetUserPasswordCommand({
        UserPoolId: USER_POOL_ID,
        Username: user.email,
        Password: PASSWORD,
        Permanent: true,
      }));
      
      console.log(`✅ Created: ${user.name} (${user.email})`);
    } catch (error) {
      if (error.name === 'UsernameExistsException') {
        console.log(`⚠️ Already exists: ${user.email}`);
      } else {
        console.error(`❌ Error creating ${user.email}:`, error.message);
      }
    }
  }
  
  console.log('\n========================================');
  console.log('テストユーザー作成完了！');
  console.log('共通パスワード: TestPass123');
  console.log('========================================');
}

createTestUsers();
