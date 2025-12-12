import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TaskManager from './TaskManager';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: '20px' }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '2px solid #ccc',
            paddingBottom: '10px'
          }}>
            <h1>📝 Task Manager</h1>
            <div>
              <span style={{ marginRight: '15px' }}>
                👤 {user.username}
              </span>
              <button onClick={signOut}>ログアウト</button>
            </div>
          </header>
          
          <TaskManager user={user} />
        </div>
      )}
    </Authenticator>
  );
}

export default App;