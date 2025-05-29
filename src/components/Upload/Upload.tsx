import { useCallback } from 'react'

import Button from '@components/Button'

import { useUpload } from './useUpload'

export const Upload: React.FC = () => {
  const {
    files,
    dragActive,
    uploadStatus,
    uploadProgress,
    errors,
    isUploading,
    handleSelect,
    handleDrag,
    handleDrop,
    handleUpload,
    getFilePreview,
    removeFile,
  } = useUpload()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSelect(e.target.files)
    },
    [handleSelect]
  )

  return (
    <>
      <div className="upload-container">
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            className="input"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleChange}
          />
          <p>拖拽文件到此处或点击选择文件</p>
          <p>支持图片、PDF、Word文档，单个文件最大10MB</p>
        </div>

        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="file-list">
            <h4>已选择的文件 ({files.length})</h4>
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  {getFilePreview(file) && (
                    <img
                      src={getFilePreview(file)!}
                      alt={file.name}
                      className="file-preview"
                    />
                  )}
                  <div className="file-details">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  </div>
                </div>

                {uploadStatus[file.name] === '上传中...' && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                    <span className="progress-text">
                      {uploadProgress[file.name] || 0}%
                    </span>
                  </div>
                )}

                <div className="file-actions">
                  <span
                    className={`status ${uploadStatus[file.name] || 'pending'}`}
                  >
                    {uploadStatus[file.name] || '待上传'}
                  </span>
                  <Button
                    className="remove-btn"
                    onClick={() => removeFile(file.name)}
                    size="medium"
                    disabled={isUploading}
                    type="primary"
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="upload-btn"
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              type="primary"
            >
              {isUploading ? '上传中...' : '开始上传'}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
