---
sidebar_position: 3
---

# Files

## Table of Contents

- [Overview](#overview)
- [File Management Architecture](#file-management-architecture)
- [File Properties](#file-properties)
- [API Reference](#api-reference)
  - [RecentFiles](#recentfiles)
  - [LoadMoreRecentFiles](#loadmorerecentfiles)
  - [GetDownloadUrl](#getdownloadurl)
  - [FileUpload](#fileupload)
- [Usage Examples](#usage-examples)
- [Advanced Usage](#advanced-usage)
- [File Types and Validation](#file-types-and-validation)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The EVA Web SDK provides a comprehensive file management system that allows users to upload files, access recently uploaded files, manage file attachments in conversations, and download files securely. The Recent Files feature gives users quick access to their most recently uploaded or accessed files within the EVA platform.

### Key Capabilities

- 📁 **Recent Files Access** - View and access recently uploaded files
- 📤 **File Upload** - Upload files as attachments or context for conversations
- 📥 **Secure Downloads** - Generate secure download URLs for files
- 🔄 **Pagination** - Load more files efficiently with offset-based pagination
- 🔍 **File Metadata** - Comprehensive file information including size, type, and upload date
- ✅ **Validation** - Automatic file type and size validation

## File Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EVA Web SDK                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Recent     │  │  Load More   │  │  Download   │ │
│  │   Files      │  │  Recent      │  │     URL     │ │
│  │              │  │  Files       │  │             │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                         │
│                  ┌──────────────┐                      │
│                  │ File Upload  │                      │
│                  │   & Context  │                      │
│                  └──────────────┘                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
           ▼                    ▼                ▼
    ┌───────────┐        ┌───────────┐   ┌───────────┐
    │  Recent   │        │  Upload   │   │  Context  │
    │  Files    │        │   New     │   │  Manager  │
    │  List     │        │  Files    │   │           │
    └───────────┘        └───────────┘   └───────────┘
```

### File Lifecycle

1. **Upload** - User uploads file through FileUpload API
2. **Validation** - File type and size validation
3. **Processing** - File is uploaded to EVA server
4. **Storage** - File metadata stored and accessible via Recent Files
5. **Retrieval** - Access file through Recent Files or download URL
6. **Context** - Attach files as context to conversations

## File Properties

Each file object contains the following properties:

### File Object Structure

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the file |
| `fileName` | `string` | Original name of the file |
| `fileExtension` | `string` | File extension (e.g., 'pdf', 'docx', 'txt') |
| `fileType` | `string` | Type category (e.g., 'attachment', 'image', 'video') |
| `createdOn` | `number` | Timestamp when file was uploaded (Unix timestamp) |
| `size` | `number` | File size in bytes |
| `scope` | `string` | File scope or visibility |
| `uploadedBy` | `string` | User ID of the uploader |

### File Object Example

```javascript
{
  id: "file-abc-123-xyz",
  fileName: "Q4_Report_2024.pdf",
  fileExtension: "pdf",
  fileType: "attachment",
  createdOn: 1703001234567,
  size: 2048576, // bytes (2 MB)
  scope: "user",
  uploadedBy: "u-********-****-****-****-************"
}
```

## API Reference

### RecentFiles()

Fetches the list of recently uploaded or accessed files for the current user.

**Import:**
```javascript
import { RecentFiles } from 'eva-web-sdk/files';
```

**Syntax:**
```javascript
const result = await RecentFiles();
```

**Parameters:**
- None (uses configuration from SDK initialization)

**Returns:**
```javascript
{
  status: "succeeded" | "failed",
  error: null | ErrorObject,
  data: File[],           // Array of file objects
  hasMore: boolean        // Whether more files are available
}
```

**Response Example:**
```javascript
{
  status: "succeeded",
  error: null,
  data: [
    {
      id: "file-001",
      fileName: "Project_Proposal.docx",
      fileExtension: "docx",
      fileType: "attachment",
      createdOn: 1703001234567,
      size: 1048576,
      scope: "user",
      uploadedBy: "u-********-****-****-****-************"
    },
    {
      id: "file-002",
      fileName: "Budget_2024.xlsx",
      fileExtension: "xlsx",
      fileType: "attachment",
      createdOn: 1703000123456,
      size: 524288,
      scope: "user",
      uploadedBy: "u-********-****-****-****-************"
    }
  ],
  hasMore: true
}
```

**Implementation Details:**
- Automatically called during SDK initialization with default limit (10 files)
- Files are ordered by most recent first
- Subscribes to Redux store for state updates
- Returns structured file data with essential properties

**Initial Load:**
During SDK initialization, recent files are automatically fetched:
```javascript
// In config.js initialization
store.dispatch(fetchRecentFiles({
  onload: true,
  userId: config.userId,
  params: { limit: 10 }
}))
```

---

### LoadMoreRecentFiles()

Loads additional recent files with pagination support.

**Import:**
```javascript
import { LoadMoreRecentFiles } from 'eva-web-sdk/files';
```

**Syntax:**
```javascript
const result = await LoadMoreRecentFiles(options);
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options` | `object` | No | `{}` | Configuration options |
| `options.limit` | `number` | No | `10` | Number of files to load |
| `options.initialData` | `boolean` | No | `false` | Reset to first page if true |

**Returns:**
```javascript
{
  status: "succeeded" | "failed",
  error: null | ErrorObject,
  data: File[],           // Array of file objects
  hasMore: boolean        // Whether more files are available
}
```

**Response Example:**
```javascript
{
  status: "succeeded",
  error: null,
  data: [
    {
      id: "file-011",
      fileName: "Meeting_Notes.txt",
      fileExtension: "txt",
      fileType: "attachment",
      createdOn: 1702999123456,
      size: 8192,
      scope: "user",
      uploadedBy: "u-********-****-****-****-************"
    }
    // ... 9 more files
  ],
  hasMore: true
}
```

**Implementation Details:**
- Uses offset-based pagination
- Automatically increments offset for subsequent calls
- Can be reset with `initialData: true`
- Cumulative results are stored in Redux state
- Sets loading state during fetch operation

**Pagination Mechanism:**
```javascript
// Internal offset tracking
let recentFilesOffset = 1

// Each call increments offset
const offset = recentFilesOffset * limit
recentFilesOffset++
```

---

### GetDownloadUrl()

Generates a secure, time-limited download URL for a file.

**Import:**
```javascript
import { GetDownloadUrl } from 'eva-web-sdk/files';
```

**Syntax:**
```javascript
const result = await GetDownloadUrl(file);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `object` | Yes | File object containing file ID |
| `file.id` | `string` | Yes | Unique file identifier |

**Returns:**
```javascript
{
  status: "succeeded" | "failed",
  error: null | ErrorObject,
  data: {
    url: string,          // Secure download URL
    expiresOn: number     // Expiration timestamp
  }
}
```

**Response Example:**
```javascript
{
  status: "succeeded",
  error: null,
  data: {
    url: "https://eva-storage.kore.ai/files/secure/abc123xyz...?token=...",
    expiresOn: 1703010234567  // Expires in X minutes
  }
}
```

**Implementation Details:**
- Generates signed URL with authentication token
- URL is time-limited for security
- Uses file ID and source type ('attachment')
- Dispatches Redux action to fetch URL
- URL can be used for direct download or display

**Security Features:**
- Token-based authentication
- Time-limited URLs (auto-expire)
- Per-file access control
- Secure HTTPS protocol

---

### FileUpload()

Comprehensive file upload functionality with context management, validation, and progress tracking.

**Import:**
```javascript
import { FileUpload } from 'eva-web-sdk';
```

**Syntax:**
```javascript
const fileUploadInstance = FileUpload(options);
```

**Returns:** Object with the following methods:

#### Methods

##### `subscribe(callback)`

Subscribe to file upload state changes.

```javascript
const unsubscribe = fileUploadInstance.subscribe((sources, sessionId, quickactions, error, apiResp) => {
  console.log('Sources:', sources);
  console.log('Session ID:', sessionId);
  console.log('Quick Actions:', quickactions);
  console.log('Errors:', error);
});

// Unsubscribe when done
unsubscribe();
```

**Callback Parameters:**
- `sources` - Array of uploaded files/attachments
- `sessionId` - Session identifier for context
- `quickactions` - Available quick actions
- `error` - Upload errors if any
- `apiResp` - Full API response

##### `uploadFile(event)`

Upload files from an input element.

```javascript
fileUploadInstance.uploadFile(event);
```

**Parameters:**
- `event` - File input change event containing `event.target.files`

**Features:**
- Multiple file upload support
- Automatic file type validation
- File size validation
- Progress tracking
- Error handling for invalid files
- Chunked upload for large files

##### `removeContext(args)`

Remove a file from the current context.

```javascript
await fileUploadInstance.removeContext({
  docId: 'file-123',
  loading: false
});
```

**Parameters:**
- `args` - File object to remove
- `args.loading` - Whether file is currently uploading

##### `setAttachmentContext(args)`

Set a file as context for the current conversation.

```javascript
fileUploadInstance.setAttachmentContext({
  id: 'file-123',
  fileName: 'document.pdf',
  fileExtension: 'pdf'
});
```

**Parameters:**
- `args` - File object with id, fileName, and fileExtension

##### `askFollowup(args)`

Set context for follow-up questions.

```javascript
fileUploadInstance.askFollowup({
  boardId: 'board-123',
  messageId: 'msg-456',
  sources: [fileObject],
  context: contextObject,
  type: 'followup'
});
```

##### `clearContext()`

Clear all file context.

```javascript
fileUploadInstance.clearContext();
```

**File Upload Configuration:**

Files are validated against:
- **Allowed File Types** - Retrieved from SDK config
- **Max File Size** - Retrieved from SDK config (maxKnowledgeFileSize)
- **File Context** - Set as 'knowledge' for knowledge base files

**Supported File Categories:**
- **Attachments** - Documents (PDF, DOCX, TXT, CSV, etc.)
- **Images** - PNG, JPG, JPEG, GIF, etc.
- **Videos** - MP4, AVI, MOV, etc.
- **Audio** - MP3, WAV, OGG, etc.

## Usage Examples

### Example 1: Display Recent Files List

```javascript
import React, { useEffect, useState } from 'react';
import { RecentFiles } from 'eva-web-sdk/files';
import { formatBytes, formatDate } from './utils';

function RecentFilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadRecentFiles();
  }, []);

  const loadRecentFiles = async () => {
    try {
      const result = await RecentFiles();
      
      if (result.status === 'succeeded') {
        setFiles(result.data);
        setHasMore(result.hasMore);
      } else {
        console.error('Failed to load files:', result.error);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading recent files...</div>;

  return (
    <div className="recent-files-list">
      <h2>Recent Files</h2>
      {files.length === 0 ? (
        <p>No recent files</p>
      ) : (
        <ul>
          {files.map(file => (
            <li key={file.id} className="file-item">
              <div className="file-icon">
                <FileIcon extension={file.fileExtension} />
              </div>
              <div className="file-details">
                <h4>{file.fileName}</h4>
                <p>
                  {formatBytes(file.size)} • {formatDate(file.createdOn)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {hasMore && <p className="has-more">More files available</p>}
    </div>
  );
}

export default RecentFilesList;
```

### Example 2: Load More Files with Pagination

```javascript
import React, { useEffect, useState } from 'react';
import { RecentFiles, LoadMoreRecentFiles } from 'eva-web-sdk/files';

function InfiniteFilesList() {
  const [files, setFiles] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialFiles();
  }, []);

  const loadInitialFiles = async () => {
    setLoading(true);
    const result = await RecentFiles();
    
    if (result.status === 'succeeded') {
      setFiles(result.data);
      setHasMore(result.hasMore);
    }
    
    setLoading(false);
  };

  const loadMoreFiles = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    const result = await LoadMoreRecentFiles({ limit: 10 });
    
    if (result.status === 'succeeded') {
      // Append new files to existing list
      setFiles(prevFiles => [...prevFiles, ...result.data]);
      setHasMore(result.hasMore);
    }
    
    setLoading(false);
  };

  return (
    <div className="infinite-files-list">
      <h2>Recent Files</h2>
      <div className="files-grid">
        {files.map(file => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
      
      {hasMore && (
        <button
          onClick={loadMoreFiles}
          disabled={loading}
          className="load-more-button"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

function FileCard({ file }) {
  return (
    <div className="file-card">
      <FileIcon extension={file.fileExtension} />
      <h4>{file.fileName}</h4>
      <p>{formatBytes(file.size)}</p>
    </div>
  );
}

export default InfiniteFilesList;
```

### Example 3: Download File with Secure URL

```javascript
import React, { useState } from 'react';
import { RecentFiles, GetDownloadUrl } from 'eva-web-sdk/files';

function DownloadableFileList() {
  const [files, setFiles] = useState([]);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const result = await RecentFiles();
    if (result.status === 'succeeded') {
      setFiles(result.data);
    }
  };

  const handleDownload = async (file) => {
    setDownloading(file.id);
    
    try {
      // Get secure download URL
      const result = await GetDownloadUrl(file);
      
      if (result.status === 'succeeded') {
        const { url } = result.data;
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Download started for:', file.fileName);
      } else {
        console.error('Failed to get download URL:', result.error);
        alert('Failed to download file. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while downloading the file.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="downloadable-files">
      <h2>Recent Files</h2>
      <table className="files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Size</th>
            <th>Uploaded</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td>
                <FileIcon extension={file.fileExtension} />
                {file.fileName}
              </td>
              <td>{formatBytes(file.size)}</td>
              <td>{formatDate(file.createdOn)}</td>
              <td>
                <button
                  onClick={() => handleDownload(file)}
                  disabled={downloading === file.id}
                  className="download-button"
                >
                  {downloading === file.id ? (
                    <span>Downloading...</span>
                  ) : (
                    <span>⬇ Download</span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DownloadableFileList;
```

### Example 4: File Upload with Progress

```javascript
import React, { useState, useEffect } from 'react';
import { FileUpload } from 'eva-web-sdk';

function FileUploadComponent() {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileUploadInstance = FileUpload();

  useEffect(() => {
    // Subscribe to file upload updates
    const unsubscribe = fileUploadInstance.subscribe(
      (sources, sessionId, quickactions, error) => {
        if (sources) {
          setFiles(sources);
        }
        if (error) {
          setErrors(error);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFileChange = (event) => {
    fileUploadInstance.uploadFile(event);
  };

  const handleRemoveFile = (file) => {
    fileUploadInstance.removeContext(file);
  };

  const handleClearAll = () => {
    fileUploadInstance.clearContext();
    setFiles([]);
    setErrors([]);
  };

  return (
    <div className="file-upload-component">
      <h3>Upload Files</h3>
      
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="file-input"
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
      />

      {/* Uploading Files */}
      {files.length > 0 && (
        <div className="uploaded-files">
          <h4>Attached Files ({files.length})</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <FileIcon extension={file.extName} />
                <span>{file.title || file.fileName}</span>
                {file.loading && <span className="loading">Uploading...</span>}
                {!file.loading && (
                  <button
                    onClick={() => handleRemoveFile(file)}
                    className="remove-button"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button onClick={handleClearAll} className="clear-all-button">
            Clear All
          </button>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="upload-errors">
          <h4>Upload Errors</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="error-item">
                <strong>{error.fileName || error.title}</strong>: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
```

### Example 5: Set File as Conversation Context

```javascript
import React, { useEffect, useState } from 'react';
import { RecentFiles } from 'eva-web-sdk/files';
import { FileUpload } from 'eva-web-sdk';
import { ChatInterface } from 'eva-web-sdk/chat';

function FileContextSelector() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileUploadInstance = FileUpload();

  useEffect(() => {
    loadRecentFiles();
  }, []);

  const loadRecentFiles = async () => {
    const result = await RecentFiles();
    if (result.status === 'succeeded') {
      setFiles(result.data);
    }
  };

  const handleSetContext = (file) => {
    // Set file as context for conversation
    fileUploadInstance.setAttachmentContext(file);
    setSelectedFile(file);
    
    // You can also directly use it in chat
    ChatInterface().sendMessage({
      question: `Analyze this file: ${file.fileName}`,
      context: {
        sources: [file]
      }
    });
  };

  return (
    <div className="file-context-selector">
      <h3>Select File for Context</h3>
      
      <div className="files-list">
        {files.map(file => (
          <div
            key={file.id}
            className={`file-card ${selectedFile?.id === file.id ? 'selected' : ''}`}
            onClick={() => handleSetContext(file)}
          >
            <FileIcon extension={file.fileExtension} />
            <div className="file-info">
              <h4>{file.fileName}</h4>
              <p>{formatBytes(file.size)}</p>
            </div>
            {selectedFile?.id === file.id && (
              <span className="selected-badge">✓ Selected</span>
            )}
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="context-info">
          <p>
            <strong>{selectedFile.fileName}</strong> is set as conversation context
          </p>
          <button onClick={() => fileUploadInstance.clearContext()}>
            Clear Context
          </button>
        </div>
      )}
    </div>
  );
}

export default FileContextSelector;
```

## Advanced Usage

### Accessing Files from Redux Store

```javascript
import { store } from 'eva-web-sdk';

// Get recent files state
const state = store.getState().global;

// Recent files with API response
const recentFilesResponse = state.recentFiles;
console.log(recentFilesResponse.status); // 'loading', 'succeeded', 'failed'
console.log(recentFilesResponse.data);   // { files: [...], moreAvailable: true }

// All loaded files (cumulative)
const allLoadedFiles = state.AllrecentFiles;

// Selected context (uploaded files as context)
const selectedContext = state.selectedContext;
console.log(selectedContext.data?.sources); // Array of files in context
console.log(selectedContext.data?.sessionId); // Session ID

// File configuration
const fileTypes = state.fileTypes; // Allowed file types
const maxFileSize = state.maxAllowedFileSize; // Max file size in bytes

// Subscribe to file updates
const unsubscribe = store.subscribe(() => {
  const newState = store.getState().global;
  console.log('Files updated:', newState.recentFiles);
});

unsubscribe();
```

### Custom File Filtering

```javascript
import { RecentFiles } from 'eva-web-sdk/files';

async function getFilesByExtension(extension) {
  const result = await RecentFiles();
  
  if (result.status === 'succeeded') {
    return result.data.filter(file => 
      file.fileExtension === extension.toLowerCase()
    );
  }
  
  return [];
}

// Usage
const pdfFiles = await getFilesByExtension('pdf');
const excelFiles = await getFilesByExtension('xlsx');
```

### File Size Formatting Utility

```javascript
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Usage
formatBytes(1024);      // "1 KB"
formatBytes(1048576);   // "1 MB"
formatBytes(2097152);   // "2 MB"
```

### Date Formatting Utility

```javascript
import moment from 'moment';

function formatDate(timestamp) {
  return moment(timestamp).format('MMM DD, YYYY h:mm A');
}

function formatRelativeDate(timestamp) {
  return moment(timestamp).fromNow();
}

// Usage
formatDate(1703001234567);        // "Dec 19, 2023 5:20 PM"
formatRelativeDate(1703001234567); // "2 hours ago"
```

## File Types and Validation

### Supported File Types

The SDK supports various file types organized by category:

**Documents:**
- PDF (`.pdf`)
- Microsoft Word (`.doc`, `.docx`)
- Text Files (`.txt`)
- CSV (`.csv`)
- Excel (`.xls`, `.xlsx`)
- PowerPoint (`.ppt`, `.pptx`)

**Images:**
- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- BMP (`.bmp`)
- WebP (`.webp`)

**Videos:**
- MP4 (`.mp4`)
- AVI (`.avi`)
- MOV (`.mov`)
- WebM (`.webm`)

**Audio:**
- MP3 (`.mp3`)
- WAV (`.wav`)
- OGG (`.ogg`)
- M4A (`.m4a`)

**Code Files:**
- JavaScript (`.js`)
- Python (`.py`)
- Java (`.java`)
- C/C++ (`.c`, `.cpp`, `.h`)
- HTML (`.html`)
- CSS (`.css`)
- JSON (`.json`)
- XML (`.xml`)

### File Size Limits

File size limits are configured per EVA instance and retrieved during SDK initialization:

```javascript
const state = store.getState().global;
const maxSizeBytes = state.maxAllowedFileSize;
const maxSizeMB = Math.round(maxSizeBytes / (1024 * 1024));

console.log(`Max file size: ${maxSizeMB} MB`);
```

**Typical Limits:**
- Development: 10-25 MB
- Production: 25-100 MB
- Enterprise: Configurable up to 500 MB

### Validation Errors

The SDK provides detailed error messages for validation failures:

**File Size Error:**
```javascript
{
  error: 'size',
  message: 'File Size has to be less than 25 MB',
  fileName: 'large-file.pdf'
}
```

**File Type Error:**
```javascript
{
  error: 'type',
  message: 'The file type exe is not Compatible',
  fileName: 'program.exe'
}
```

### Custom Validation

```javascript
function validateFile(file, maxSize, allowedTypes) {
  const errors = [];
  
  // Size validation
  if (file.size > maxSize) {
    errors.push({
      type: 'size',
      message: `File size exceeds ${formatBytes(maxSize)}`
    });
  }
  
  // Type validation
  const extension = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(extension)) {
    errors.push({
      type: 'format',
      message: `File type .${extension} is not supported`
    });
  }
  
  return errors;
}

// Usage
const state = store.getState().global;
const errors = validateFile(
  file,
  state.maxAllowedFileSize,
  state.fileTypes.attachment
);

if (errors.length > 0) {
  console.error('Validation failed:', errors);
}
```

## Best Practices

### 1. Handle Loading States

```javascript
function FilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await RecentFiles();
      
      if (result.status === 'succeeded') {
        setFiles(result.data);
      } else {
        setError('Failed to load files');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <FilesDisplay files={files} />;
}
```

### 2. Implement Proper Error Handling

```javascript
async function safeFileOperation(operation) {
  try {
    const result = await operation();
    
    if (result.status === 'succeeded') {
      return { success: true, data: result.data };
    } else {
      return {
        success: false,
        error: result.error || 'Operation failed'
      };
    }
  } catch (error) {
    console.error('File operation error:', error);
    return {
      success: false,
      error: error.message || 'Unexpected error occurred'
    };
  }
}

// Usage
const result = await safeFileOperation(() => RecentFiles());
if (result.success) {
  console.log('Files loaded:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### 3. Cache File Data

```javascript
const fileCache = {
  data: null,
  timestamp: null,
  duration: 5 * 60 * 1000 // 5 minutes
};

async function getFilesWithCache() {
  const now = Date.now();
  
  if (fileCache.data && 
      fileCache.timestamp && 
      (now - fileCache.timestamp) < fileCache.duration) {
    return fileCache.data;
  }
  
  const result = await RecentFiles();
  
  if (result.status === 'succeeded') {
    fileCache.data = result.data;
    fileCache.timestamp = now;
  }
  
  return result.data;
}
```

### 4. Optimize Pagination

```javascript
function useInfiniteFiles(pageSize = 10) {
  const [files, setFiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      const result = await LoadMoreRecentFiles({ limit: pageSize });
      
      if (result.status === 'succeeded') {
        setFiles(prev => [...prev, ...result.data]);
        setHasMore(result.hasMore);
      }
    } finally {
      setLoading(false);
    }
  };

  return { files, hasMore, loading, loadMore };
}
```

### 5. Secure Download Implementation

```javascript
async function secureDownload(file) {
  try {
    const result = await GetDownloadUrl(file);
    
    if (result.status !== 'succeeded') {
      throw new Error('Failed to get download URL');
    }
    
    const { url, expiresOn } = result.data;
    
    // Check if URL is still valid
    if (Date.now() > expiresOn) {
      throw new Error('Download URL has expired');
    }
    
    // Download file
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Create download link
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.fileName;
    link.click();
    
    // Cleanup
    window.URL.revokeObjectURL(downloadUrl);
    
    return { success: true };
  } catch (error) {
    console.error('Download failed:', error);
    return { success: false, error: error.message };
  }
}
```

## Troubleshooting

### Issue: Recent Files Not Loading

**Symptoms:**
- Empty file list
- Status shows 'loading' indefinitely

**Solutions:**

1. **Ensure SDK is initialized:**
```javascript
await initializeSDK(config);
const files = await RecentFiles();
```

2. **Check network connectivity:**
```javascript
const result = await RecentFiles();
if (result.status === 'failed') {
  console.error('Network error:', result.error);
}
```

3. **Verify authentication:**
```javascript
console.log('User ID:', window.sdkConfig.userId);
console.log('Access Token:', window.sdkConfig.accessToken);
```

### Issue: File Upload Fails

**Cause:** File size or type validation failure

**Solution:**
```javascript
// Check file against limits
const state = store.getState().global;
const maxSize = state.maxAllowedFileSize;
const allowedTypes = state.fileTypes.attachment;

console.log('Max size:', formatBytes(maxSize));
console.log('Allowed types:', allowedTypes);

// Validate before upload
if (file.size > maxSize) {
  alert(`File too large. Max size: ${formatBytes(maxSize)}`);
  return;
}

const ext = file.name.split('.').pop().toLowerCase();
if (!allowedTypes.includes(ext)) {
  alert(`File type .${ext} not supported`);
  return;
}
```

### Issue: Download URL Expired

**Cause:** URL has time-limited validity

**Solution:**
```javascript
async function downloadWithRetry(file, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const result = await GetDownloadUrl(file);
    
    if (result.status === 'succeeded') {
      const { url, expiresOn } = result.data;
      
      // Check expiration
      if (Date.now() < expiresOn) {
        return url; // Valid URL
      }
    }
    
    if (i < retries) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('Failed to get valid download URL');
}
```

### Issue: Load More Not Working

**Cause:** Offset not incrementing properly or no more files available

**Solution:**
```javascript
// Reset pagination
await LoadMoreRecentFiles({ initialData: true, limit: 10 });

// Then load subsequent pages
await LoadMoreRecentFiles({ limit: 10 });
```

### Issue: File Context Not Setting

**Cause:** Previous context not cleared or session conflict

**Solution:**
```javascript
const fileUploadInstance = FileUpload();

// Clear previous context first
fileUploadInstance.clearContext();

// Then set new context
fileUploadInstance.setAttachmentContext(file);
```

## Related Documentation

- **[Getting Started Guide](../intro)** - SDK initialization
- **[SDK Initialization](./initialization)** - Detailed initialization guide
- **[Agents Documentation](./agents)** - Working with agents

## Support

For additional help:
- 📧 Email: support@kore.ai
- 💬 Community: [community.kore.ai](https://community.kore.ai)
- 📚 Documentation: [docs.kore.ai](https://docs.kore.ai)

---

**Last Updated:** October 29, 2025  
**SDK Version:** 1.1.60

Copyright © 2025 Kore.ai, Inc.

