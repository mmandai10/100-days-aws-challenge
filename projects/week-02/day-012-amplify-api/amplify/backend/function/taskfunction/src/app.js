/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// DynamoDB Document Clientを初期化
const dynamodb = new AWS.DynamoDB.DocumentClient();

// 環境変数からテーブル名を取得
const tableName = process.env.STORAGE_TASKTABLE_NAME;

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/tasks', async function(req, res) {
  try {
    // DynamoDBから全タスクを取得
    const params = {
      TableName: tableName
    };
    
    const result = await dynamodb.scan(params).promise();
    
    // 成功レスポンス
    res.json({ 
      success: true, 
      tasks: result.Items,
      count: result.Count 
    });
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
});

app.get('/tasks/:id', async function(req, res) {
  try {
    // URLパラメータからタスクIDを取得
    const taskId = req.params.id;
    
    // DynamoDBから特定のタスクを取得
    const params = {
      TableName: tableName,
      Key: {
        id: taskId
      }
    };
    
    const result = await dynamodb.get(params).promise();
    
    // タスクが見つからない場合
    if (!result.Item) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // 成功レスポンス
    res.json({ success: true, task: result.Item });
    
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Could not fetch task' });
  }
});

/****************************
* Example post method *
****************************/

app.post('/tasks', async function(req, res) {
  try {
    // リクエストボディからタスク情報を取得
    const { title, description, status = 'pending' } = req.body;
    
    // 必須項目チェック
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    // 新しいタスクオブジェクトを作成
    const task = {
      id: uuidv4(), // ユニークIDを生成
      title,
      description: description || '',
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // DynamoDBに保存
    const params = {
      TableName: tableName,
      Item: task
    };
    
    await dynamodb.put(params).promise();
    
    // 成功レスポンス
    res.json({ success: true, task });
    
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Could not create task' });
  }
});

app.post('/tasks/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/tasks/:id', async function(req, res) {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    
    // 更新する項目を動的に構築
    let updateExpression = 'SET updatedAt = :updatedAt';
    let expressionAttributeValues = {
      ':updatedAt': new Date().toISOString()
    };
    
    // titleが指定されていれば追加
    if (title) {
      updateExpression += ', title = :title';
      expressionAttributeValues[':title'] = title;
    }
    
    // descriptionが指定されていれば追加
    if (description !== undefined) {
      updateExpression += ', description = :description';
      expressionAttributeValues[':description'] = description;
    }
    
    // statusが指定されていれば追加
    if (status) {
      updateExpression += ', #status = :status';
      expressionAttributeValues[':status'] = status;
    }
    
    // DynamoDBを更新
    const params = {
      TableName: tableName,
      Key: { id: taskId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: {
        '#status': 'status' // 'status'は予約語なので別名を使用
      },
      ReturnValues: 'ALL_NEW' // 更新後の値を返す
    };
    
    const result = await dynamodb.update(params).promise();
    
    res.json({ success: true, task: result.Attributes });
    
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Could not update task' });
  }
});

app.put('/tasks', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/tasks/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/tasks/:id', async function(req, res) {
  try {
    const taskId = req.params.id;
    
    // DynamoDBから削除
    const params = {
      TableName: tableName,
      Key: { id: taskId },
      ReturnValues: 'ALL_OLD' // 削除前の値を返す
    };
    
    const result = await dynamodb.delete(params).promise();
    
    // タスクが存在しなかった場合
    if (!result.Attributes) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Task deleted successfully',
      deletedTask: result.Attributes 
    });
    
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Could not delete task' });
  }
});

app.delete('/tasks', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/tasks/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app