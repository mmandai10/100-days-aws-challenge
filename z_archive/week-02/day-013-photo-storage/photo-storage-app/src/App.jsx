import { useState, useEffect } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { uploadData, getUrl, list, remove } from 'aws-amplify/storage'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [images, setImages] = useState([])

  // アップロード済み画像を取得
  const fetchImages = async () => {
    try {
      const result = await list({ path: 'photos/' })
      
      const imageUrls = await Promise.all(
        result.items.map(async (item) => {
          const url = await getUrl({ path: item.path })
          return {
            key: item.path,
            url: url.url.toString(),
            name: item.path.split('/').pop()
          }
        })
      )
      
      setImages(imageUrls)
    } catch (error) {
      console.error('画像取得エラー:', error)
    }
  }

  // 初回読み込み時に画像を取得
  useEffect(() => {
    fetchImages()
  }, [])

  // ファイル選択
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  // ファイルアップロード
  const handleUpload = async () => {
    if (!file) {
      alert('ファイルを選択してください')
      return
    }

    try {
      setUploading(true)
      setProgress(0)

      const fileName = `photos/${Date.now()}-${file.name}`
      
      await uploadData({
        path: fileName,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const percentage = Math.round((transferredBytes / totalBytes) * 100)
              setProgress(percentage)
            }
          }
        }
      }).result

      alert('アップロード成功！')
      setFile(null)
      setProgress(0)
      fetchImages() // 画像一覧を更新
      
    } catch (error) {
      console.error('アップロードエラー:', error)
      alert('アップロードに失敗しました')
    } finally {
      setUploading(false)
    }
  }

  // ファイル削除
  const handleDelete = async (key) => {
    if (!window.confirm('この画像を削除しますか？')) return

    try {
      await remove({ path: key })
      alert('削除しました')
      fetchImages() // 画像一覧を更新
    } catch (error) {
      console.error('削除エラー:', error)
      alert('削除に失敗しました')
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <header>
            <h1>📸 Photo Storage App</h1>
            <div className="user-info">
              <span>ようこそ、{user.username}さん</span>
              <button onClick={signOut} className="signout-btn">ログアウト</button>
            </div>
          </header>
          
          <main>
            {/* アップロードセクション */}
            <div className="upload-section">
              <h2>📤 画像をアップロード</h2>
              
              <div className="file-input-wrapper">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                
                {file && <p className="file-name">選択: {file.name}</p>}
                
                <button 
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="upload-btn"
                >
                  {uploading ? 'アップロード中...' : 'アップロード'}
                </button>
              </div>

              {/* プログレスバー */}
              {uploading && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}>
                    {progress}%
                  </div>
                </div>
              )}
            </div>

            {/* 画像一覧セクション */}
            <div className="gallery-section">
              <h2>🖼️ アップロード済み画像 ({images.length}枚)</h2>
              
              <div className="image-grid">
                {images.map((image) => (
                  <div key={image.key} className="image-card">
                    <img src={image.url} alt={image.name} />
                    <div className="image-info">
                      <p className="image-name">{image.name}</p>
                      <button 
                        onClick={() => handleDelete(image.key)}
                        className="delete-btn"
                      >
                        🗑️ 削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {images.length === 0 && (
                <p className="empty-message">まだ画像がアップロードされていません</p>
              )}
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  )
}

export default App