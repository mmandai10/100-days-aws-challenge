import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>🎉 Day 11: 認証成功！</h1>
          <p>ようこそ、{user.username}さん！</p>
          <p>AWS Amplifyで認証機能を実装しました</p>
          <button onClick={signOut} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            サインアウト
          </button>
        </div>
      )}
    </Authenticator>
  )
}

export default App