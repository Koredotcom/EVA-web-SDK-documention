---
sidebar_position: 1
---

# SDK Initialization

This tutorial guides you through the process of initializing the AI4W Web SDK in your React, Angular, or Vue application.

## Overview

The `initializeSDK` function is the entry point for configuring and starting the AI4W Web SDK. It must be called before using any SDK components or features.

## Basic Initialization

### React

Initialize the SDK in your main entry file before rendering your application:

```javascript
// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeSDK } from 'eva-web-sdk';
import App from './App';

// Initialize the SDK
initializeSDK({
  accessToken: 'your-access-token',
  api_url: 'https://your-eva-instance.com/api/',
  presence_url: 'https://your-eva-instance.com/',
  userId: 'your-user-id'
});

// Render your application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Angular

Initialize the SDK in your `main.ts` file before bootstrapping your Angular application:

```typescript
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeSDK } from 'eva-web-sdk';
import { AppModule } from './app/app.module';

// Initialize the SDK
initializeSDK({
  accessToken: 'your-access-token',
  api_url: 'https://your-eva-instance.com/api/',
  presence_url: 'https://your-eva-instance.com/',
  userId: 'your-user-id'
});

// Bootstrap your Angular application
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### Vue

Initialize the SDK in your `main.js` file before creating your Vue application:

```javascript
// main.js
import { createApp } from 'vue';
import { initializeSDK } from 'eva-web-sdk';
import App from './App.vue';

// Initialize the SDK
initializeSDK({
  accessToken: 'your-access-token',
  api_url: 'https://your-eva-instance.com/api/',
  presence_url: 'https://your-eva-instance.com/',
  userId: 'your-user-id'
});

// Create and mount your Vue application
createApp(App).mount('#app');
```

## Configuration Options

The `initializeSDK` function accepts a configuration object with the following properties:

### Required Configuration

| Property | Type | Description |
|----------|------|-------------|
| `accessToken` | `string` | Authentication token for API access |
| `api_url` | `string` | Base URL for AI4W API endpoints (must end with `/`) |
| `presence_url` | `string` | WebSocket server URL for real-time communication |
| `userId` | `string` | Unique identifier for the current user |

### Optional Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableDebugging` | `boolean` | `false` | Enable console logging for debugging purposes |
| `initialHistoryLimit` | `number` | `10` | Number of conversation history items to load initially |
| `appMetaData` | `object` | `{}` | Application metadata for branding |
| `appMetaData.appName` | `string` | - | Name of your application |
| `appMetaData.appIcon` | `string` | - | URL to your application icon |
| `initializeBotSDK` | `object` | - | Bot SDK configuration (if using bot integration) |

## Advanced Configuration

### Example with All Options

```javascript
initializeSDK({
  // Required
  accessToken: 'k4********************wN',
  api_url: 'https://eva-qa.kore.ai/api/',
  presence_url: 'https://eva-qa.kore.ai/',
  userId: 'u-c9d2b051-****-****-a808-a1becbc4d981',
  
  // Optional
  enableDebugging: false,
  initialHistoryLimit: 20,
  
  // App Branding
  appMetaData: {
    appName: 'AI4Work',
    appIcon: 'https://ai4web.com/wp-content/uploads/2023/01/cropped-cropped-ai4web-logo-1-180x180.png'
  },
  
  // Bot Integration (Optional)
  initializeBotSDK: {
    name: 'ProcureBot',
    streamId: 'st-b6012ef2-810d-5240-b33e-5404d68b680e',
    webhook: {
      clientId: 'cs-********************-5da0',
      clientSecret: 'VJN************igwtTgOlaYX25Xs='
    }
  }
});
```

### Using Environment Variables

It's recommended to store sensitive credentials in environment variables:

#### React (.env)

```env
REACT_APP_EVA_ACCESS_TOKEN=your-access-token
REACT_APP_EVA_API_URL=https://your-eva-instance.com/api/
REACT_APP_EVA_PRESENCE_URL=https://your-eva-instance.com/
REACT_APP_EVA_USER_ID=your-user-id
```

```javascript
initializeSDK({
  accessToken: process.env.REACT_APP_EVA_ACCESS_TOKEN,
  api_url: process.env.REACT_APP_EVA_API_URL,
  presence_url: process.env.REACT_APP_EVA_PRESENCE_URL,
  userId: process.env.REACT_APP_EVA_USER_ID,
  enableDebugging: process.env.NODE_ENV === 'development'
});
```

#### Angular (environment.ts)

```typescript
// environment.ts
export const environment = {
  production: false,
  eva: {
    accessToken: 'your-access-token',
    apiUrl: 'https://your-eva-instance.com/api/',
    presenceUrl: 'https://your-eva-instance.com/',
    userId: 'your-user-id'
  }
};
```

```typescript
// main.ts
import { environment } from './environments/environment';

initializeSDK({
  accessToken: environment.eva.accessToken,
  api_url: environment.eva.apiUrl,
  presence_url: environment.eva.presenceUrl,
  userId: environment.eva.userId,
  enableDebugging: !environment.production
});
```

#### Vue (.env)

```env
VITE_EVA_ACCESS_TOKEN=your-access-token
VITE_EVA_API_URL=https://your-eva-instance.com/api/
VITE_EVA_PRESENCE_URL=https://your-eva-instance.com/
VITE_EVA_USER_ID=your-user-id
```

```javascript
initializeSDK({
  accessToken: import.meta.env.VITE_EVA_ACCESS_TOKEN,
  api_url: import.meta.env.VITE_EVA_API_URL,
  presence_url: import.meta.env.VITE_EVA_PRESENCE_URL,
  userId: import.meta.env.VITE_EVA_USER_ID,
  enableDebugging: import.meta.env.DEV
});
```

## What Happens During Initialization?

When you call `initializeSDK()`, the following operations occur automatically:

1. **Configuration Validation**: Validates that all required configuration keys are provided
2. **Global Configuration**: Stores configuration in `window.sdkConfig` for SDK-wide access
3. **Redux Store Setup**: Initializes the Redux store with global state management
4. **Foundation API Calls**: Fetches initial data including:
   - User configuration data
   - User profile information
   - Available agents
   - Conversation history (limited by `initialHistoryLimit`)
   - Recent files
   - System announcements
5. **WebSocket Connection**: Establishes real-time WebSocket connection for live updates
6. **Presence Service**: Starts presence tracking and obtains session token

## Import SDK Styles

After initialization, don't forget to import the SDK styles in your main entry file or App component:

```javascript
import 'eva-web-sdk/styles';
```

## Error Handling

The SDK validates required configuration keys during initialization. If any required key is missing, an error will be logged to the console:

```
SDK initialization error: 'accessToken' is required.
SDK initialization error: 'api_url' is required.
SDK initialization error: 'userId' is required.
```

In browser environments, the SDK will stop initialization if configuration is invalid. Ensure all required fields are provided before calling `initializeSDK()`.

## Best Practices

1. **Initialize Early**: Call `initializeSDK()` before rendering your application to ensure all services are ready
2. **Environment Variables**: Store sensitive credentials in environment variables, not in source code
3. **Error Handling**: Implement proper error handling for SDK operations
4. **Debugging**: Enable debugging during development to troubleshoot issues
5. **History Limit**: Adjust `initialHistoryLimit` based on your application's needs to optimize initial load time

## Troubleshooting

### SDK initialization error: 'accessToken' is required

**Solution**: Ensure you provide a valid `accessToken` in the configuration object.

### WebSocket connection failed

**Solution**: Verify that the `presence_url` is correct and accessible from your network.

### Components not rendering

**Solution**: Make sure you've imported the SDK styles with `import 'eva-web-sdk/styles'`.

### Redux store not accessible

**Solution**: Ensure `initializeSDK()` is called before accessing the store or rendering components.

## Next Steps

Now that you've initialized the SDK, you can start using its components and features:

- Learn about [Using SDK Components](./using-components)
- Explore the [Available Modules](../api-reference/modules)
- Check out [Complete Examples](../examples)

