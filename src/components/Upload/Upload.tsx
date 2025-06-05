import React, { useCallback } from 'react'
import Button from '../Button/Button'
import { useUpload } from './useUpload'
import { CloudUploadOutlined } from '@ant-design/icons'
import type { UploadProps } from './type'

export const Upload: React.FC<UploadProps> = ({
  action,
  cancelToken,
  onProgress,
}) => {
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
    handleCancel,
    previewVisible,
    previewImage,
    previewTitle,
    showPreview,
    hidePreview,
  } = useUpload({ action, cancelToken, onProgress })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSelect(e.target.files)
    },
    [handleSelect]
  )

  const PreviewModal = () => {
    if (!previewVisible) return null

    return (
      <div
        className="preview-modal-overlay"
        data-testid="preview-modal-overlay"
        onClick={hidePreview}
      >
        <div
          className="preview-modal-content"
          data-testid={`modal-preview-image-${previewTitle}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="preview-header">
            <span className="preview-title">{previewTitle}</span>
            <button
              className="preview-close-btn"
              onClick={hidePreview}
              aria-label="关闭预览"
            >
              ×
            </button>
          </div>
          <div className="preview-body">
            <img
              src={previewImage}
              alt={previewTitle}
              className="preview-large-image"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {' '}
      <div className="upload-container" data-testid="upload-container">
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-input"
            className="input"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleChange}
            data-testid="file-input"
          />
          <CloudUploadOutlined className="upload-icon" />{' '}
          <p data-testid="upload-prompt">
            拖拽文件到此处或
            <label htmlFor="file-input" className="upload-link">
              点击上传
            </label>
          </p>
          <p>支持图片、PDF、Word文档，单个文件最大10MB</p>
        </div>

        {files.length > 0 && (
          <div className="file-list" data-testid="file-list">
            <h4>已选择的文件 ({files.length})</h4>
            {files.map((file, index) => (
              <div
                className="file-item"
                key={index}
                data-testid={`file-item-${file.name}`}
              >
                <div className="file-info">
                  {getFilePreview(file) && (
                    <img
                      src={getFilePreview(file)}
                      alt={file.name}
                      className="file-preview"
                      onClick={() => showPreview(file)}
                    />
                  )}
                  <div className="file-details">
                    <div
                      className="file-name"
                      data-testid={`filename-${file.name}`}
                    >
                      {file.name}
                    </div>
                    <div className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                    {uploadStatus[file.name] === 'uploading' && (
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
                  </div>
                </div>

                {file.type.startsWith('image/') && (
                  <Button
                    className="preview-btn"
                    aria-label="预览图片"
                    onClick={() => showPreview(file)}
                    size="medium"
                    type="primary"
                  >
                    预览
                  </Button>
                )}

                <div className="file-actions">
                  <span
                    className={`status ${uploadStatus[file.name] || 'pending'}`}
                    data-testid={`upload-status-${file.name}`}
                  >
                    {uploadStatus[file.name] || 'pending'}
                  </span>
                  {uploadStatus[file.name] === 'uploading' && (
                    <Button
                      className="cancel-btn"
                      onClick={() => handleCancel(file.name)}
                      size="medium"
                      type="primary"
                      data-testid={`cancel-button-${file.name}`}
                    >
                      取消上传
                    </Button>
                  )}
                  <Button
                    className="remove-btn"
                    onClick={() => removeFile(file.name)}
                    size="medium"
                    disabled={uploadStatus[file.name] === 'uploading'}
                    type="primary"
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <div className="upload-actions">
              <Button
                className="upload-btn"
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                type="primary"
              >
                开始上传
              </Button>
              {isUploading && (
                <Button
                  className="cancel-all-btn"
                  onClick={() => handleCancel()}
                  type="primary"
                >
                  取消所有上传
                </Button>
              )}
            </div>
          </div>
        )}
        {errors.length > 0 && (
          <div className="error-list" data-testid="error-message">
            {errors.map((error, index) => (
              <div
                key={index}
                className="error-message"
                data-testid="error-item"
              >
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
      <PreviewModal />
    </>
  )
}
