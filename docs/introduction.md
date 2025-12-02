---
sidebar_position: 0
---

# EVA WEB SDK

## Overview

**EVA Web SDK** (Enterprise Virtual Assistant Web Software Development Kit) is a powerful, enterprise-grade JavaScript library designed to seamlessly integrate AI-powered conversational capabilities into modern web applications. Built on React 18+ and Redux Toolkit, the SDK provides developers with a complete toolkit for creating intelligent, context-aware chat interfaces that enhance user productivity and streamline workplace interactions.

## What is EVA Web SDK?

EVA Web SDK is a comprehensive development framework that bridges the gap between your web applications and Kore.ai's Enterprise Virtual Assistant platform. It abstracts the complexity of AI integration, real-time communication, and state management, allowing developers to focus on building exceptional user experiences rather than dealing with infrastructure concerns.

The SDK encapsulates years of enterprise AI expertise into a developer-friendly package, offering:

- **Pre-built UI Components**: Production-ready React components for chat interfaces, compose bars, history widgets, and more
- **State Management**: Redux-powered global state with built-in actions and reducers
- **Real-time Communication**: WebSocket integration for live updates and presence tracking
- **File Management**: Complete file upload, attachment, and context handling capabilities
- **Agent Orchestration**: Seamless integration with multiple AI agents and conversational bots
- **Template Rendering**: Dynamic message rendering with support for rich content types
- **Extensibility**: Modular architecture supporting custom components and plugins

## Purpose and Vision

### Our Purpose

The EVA Web SDK exists to **democratize enterprise AI** by making sophisticated conversational AI capabilities accessible to every web developer. We believe that:

1. **AI Should Be Easy**: Integrating AI shouldn't require deep machine learning expertise
2. **Time Is Valuable**: Developers should build features, not infrastructure
3. **Quality Matters**: Enterprise applications demand reliability, security, and performance
4. **Flexibility Is Key**: Every organization has unique needs that demand customization

### Our Vision

We envision a future where:

- **Every Enterprise Application** has intelligent conversational capabilities baked in
- **Developers Can Focus** on creating value rather than managing complexity
- **Users Experience** natural, context-aware interactions across all their work tools
- **Organizations Benefit** from AI that understands their specific workflows and data

The EVA Web SDK is designed to make this vision a reality by providing the building blocks for the next generation of intelligent workplace applications.

## Why EVA Web SDK?

### Built for Enterprise

Unlike consumer-focused chatbot libraries, EVA Web SDK is built from the ground up for **enterprise requirements**:

- **Security First**: Token-based authentication, secure WebSocket connections, and data privacy
- **Scalability**: Handles thousands of concurrent users with efficient state management
- **Reliability**: Production-tested code with comprehensive error handling
- **Compliance**: Supports enterprise compliance and governance requirements
- **Integration**: Works seamlessly with existing enterprise systems and authentication

### Developer Experience

We prioritize **developer happiness** through:

- **Familiar Technologies**: Built with React, Redux, and modern JavaScript
- **Comprehensive Documentation**: Detailed guides, API references, and examples
- **Modular Architecture**: Import only what you need for optimal bundle sizes
- **TypeScript Ready**: Works seamlessly in TypeScript projects
- **Hot Reloading**: Fast development cycles with Vite integration
- **Clear APIs**: Intuitive, well-documented function signatures

### Feature Rich

The SDK provides **everything you need** out of the box:

- Conversational UI components
- Multi-agent support
- File attachments and context management
- Conversation history and bookmarking
- Real-time notifications
- Rich message templates
- Code syntax highlighting
- Markdown rendering
- Feedback mechanisms
- Presence tracking

## Key Features

### 🤖 Multi-Agent Intelligence

**Seamlessly integrate multiple AI agents** with different specializations:

- **Agent Discovery**: Automatically fetch and display available agents
- **Recent Agents**: Track and suggest frequently used agents
- **Agent Switching**: Allow users to switch between agents mid-conversation
- **Custom Agents**: Integrate your organization's custom AI agents
- **Bot Integration**: Connect with Kore.ai conversational bots

### 💬 Rich Chat Interface

**Production-ready conversational UI** with extensive capabilities:

- **Modern Design**: Beautiful, responsive chat interface
- **Message Types**: Support for text, code, tables, charts, and custom templates
- **Threading**: Organize conversations into logical threads
- **Context Awareness**: Maintain conversation context across interactions
- **Follow-up Actions**: Smart suggestions for next steps
- **Copy & Share**: Easy message copying and sharing

### 📝 Comprehensive History Management

**Never lose important conversations**:

- **Automatic Saving**: All conversations saved automatically
- **Search & Filter**: Find past conversations quickly
- **Bookmarking**: Mark important conversations for quick access
- **Pagination**: Efficient loading of conversation history
- **Thread Management**: Join, leave, and manage conversation threads
- **Export**: Export conversations for documentation

### 📎 Advanced File Management

**Handle files and attachments effortlessly**:

- **Drag & Drop**: Intuitive file upload interface
- **Multiple Formats**: Support for documents, images, code files, and more
- **Context Attachment**: Attach files as context to conversations
- **Recent Files**: Quick access to recently used files
- **Download Management**: Secure file download with URL generation
- **File Preview**: Preview supported file types before sending

### 🔄 Real-Time WebSocket Communication

**Stay connected with live updates**:

- **Automatic Connection**: WebSocket initialized during SDK setup
- **Presence Tracking**: Know when users are online
- **Live Notifications**: Receive updates in real-time
- **Reconnection Logic**: Automatic reconnection on connection loss
- **Event Handling**: Subscribe to custom events
- **Low Latency**: Minimal delay for real-time interactions

### 🎨 Customizable Widgets

**Ready-to-use UI components** for common scenarios:

- **History Widget**: Display recent conversations
- **Possibilities Widget**: Show suggested actions or queries
- **Compose Bar**: Rich text input with attachments
- **Agent Selector**: Choose from available agents
- **File Browser**: Browse and select files

### 🎯 Smart Template Rendering

**Display rich, interactive content**:

- **Dynamic Templates**: Render complex data structures beautifully
- **Code Highlighting**: Syntax highlighting for 10+ programming languages
- **Charts & Graphs**: Visualize data with ECharts integration
- **Tables**: Responsive, sortable data tables
- **Markdown**: Full markdown support with extensions
- **Custom Templates**: Create your own message templates

### 🔐 Enterprise-Grade Security

**Built with security in mind**:

- **Token Authentication**: Secure API access with bearer tokens
- **Session Management**: Automatic session handling and renewal
- **Secure WebSockets**: WSS protocol for encrypted communication
- **XSS Protection**: DOMPurify integration for safe HTML rendering
- **Input Sanitization**: Clean user input before processing
- **CORS Support**: Proper cross-origin resource handling

### 📊 State Management with Redux

**Predictable, centralized state**:

- **Global Store**: Access application state from anywhere
- **Async Actions**: Built-in thunk middleware for API calls
- **Immutable Updates**: Safe state mutations with Redux Toolkit
- **Dev Tools**: Redux DevTools integration for debugging
- **Subscriptions**: Listen to state changes reactively
- **Optimized Re-renders**: Efficient component updates

### 🔌 Modular Architecture

**Import only what you need**:

- **Tree-Shakable**: Optimize bundle size automatically
- **Sub-package Exports**: Import from specific modules
- **Independent Components**: Use components standalone
- **Plugin System**: Extend functionality with plugins
- **Custom Hooks**: Leverage React hooks for state access

### 🛠️ Developer Tools

**Everything you need for development**:

- **Debug Mode**: Detailed logging for troubleshooting
- **Error Handling**: Comprehensive error messages and recovery
- **TypeScript Support**: Use in TypeScript projects seamlessly
- **Hot Module Replacement**: Fast development with Vite
- **Source Maps**: Debug production code easily
- **Examples**: Complete working examples included

## Use Cases

### Customer Support Enhancement

Integrate AI-powered support directly into your application:
- Instant answers to common questions
- Context-aware troubleshooting
- Escalation to human agents when needed
- Conversation history for support teams

### Employee Self-Service

Empower employees with AI assistants:
- HR policy questions
- IT support and troubleshooting
- Expense and leave management
- Training and onboarding assistance

### Data Analysis & Insights

Make data accessible through conversation:
- Natural language queries to databases
- Report generation and visualization
- Trend analysis and predictions
- Export data in various formats

### Workflow Automation

Streamline business processes:
- Form filling and data entry
- Approval workflows
- Task assignment and tracking
- Integration with enterprise systems

### Knowledge Management

Create intelligent knowledge bases:
- Document search and retrieval
- Context-aware recommendations
- Learning from interactions
- Multi-format content support

## Technical Highlights

### Modern Technology Stack

- **React 18.3+**: Latest React features including concurrent rendering
- **Redux Toolkit 2.2+**: Modern Redux with simplified API
- **Socket.io 2.5**: Reliable real-time communication
- **Axios 1.7+**: Promise-based HTTP client
- **Quill 1.3**: Rich text editing capabilities
- **CodeMirror 6**: Advanced code editing and highlighting
- **ECharts 5.6**: Powerful data visualization
- **Marked 2.1**: Fast markdown parsing
- **DOMPurify 3.2**: XSS prevention and HTML sanitization

### Performance Optimized

- **Lazy Loading**: Load modules on demand
- **Code Splitting**: Separate bundles for optimal loading
- **Memoization**: Prevent unnecessary re-renders
- **Efficient State Updates**: Minimize Redux store changes
- **WebSocket Pooling**: Reuse connections efficiently
- **Bundle Size**: Optimized for production deployment

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers
- Progressive Web Apps (PWA) ready

## Getting Started

Ready to integrate AI into your application? Get started in minutes with `npm install eva-web-sdk`

The SDK requires configuration with:
- Access Token
- API URL
- Presence URL
- User ID

Check out our comprehensive guides:
- **[Getting Started Guide](./intro)** - Complete installation and setup
- **[API Reference](./API_REFERENCE.md)** - Full API documentation
- **[Examples](./EXAMPLES.md)** - Real-world implementation examples

## Who Should Use EVA Web SDK?

### Frontend Developers
Build AI-powered interfaces without backend complexity

### Full Stack Engineers  
Integrate conversational AI into existing applications

### Product Teams
Rapidly prototype and deploy AI features

### Enterprise Architects
Deploy scalable, secure AI solutions

### Startups & SMBs
Access enterprise-grade AI without enterprise budgets

## Community & Support

We're here to help you succeed:

- **📖 Documentation**: Comprehensive guides and API references
- **💬 Community Forum**: [community.kore.ai](https://community.kore.ai)
- **🐛 Issue Tracker**: Report bugs and request features on GitHub
- **📧 Email Support**: support@kore.ai
- **📚 Code Examples**: Working examples for common scenarios
- **🎓 Tutorials**: Step-by-step learning resources

## What's Next?

Explore the full capabilities of EVA Web SDK:

1. **[Getting Started](./intro)** - Install and initialize the SDK
2. **[Components](./COMPONENTS.md)** - Explore available UI components
3. **[API Reference](./API_REFERENCE.md)** - Detailed API documentation
4. **[Examples](./EXAMPLES.md)** - Real-world implementation examples
5. **[Best Practices](./BEST_PRACTICES.md)** - Tips for production deployments

## License

EVA Web SDK is licensed under the ISC License. See LICENSE for details.

---

**Current Version**: 1.1.60

Built with ❤️ by [Kore.ai](https://kore.ai) | Copyright © 2025 Kore.ai, Inc.

*Empowering developers to build the future of intelligent workplace applications.*

