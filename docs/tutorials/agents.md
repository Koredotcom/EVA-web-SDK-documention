---
sidebar_position: 2
---

# Agents

## Table of Contents

- [Overview](#overview)
- [What are Agents?](#what-are-agents)
- [Accessing Agents](#accessing-agents)
- [Agent Properties](#agent-properties)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Agents are specialized AI assistants in the EVA platform, each designed to handle specific tasks, domains, or use cases. The EVA Web SDK provides comprehensive APIs to discover, filter, and interact with agents, enabling developers to build intelligent, context-aware conversational interfaces.

## What are Agents?

**Agents** are AI-powered assistants that can:

- Perform specialized tasks (e.g., summarization, data analysis, code generation)
- Access specific knowledge domains (e.g., HR policies, IT support, legal documents)
- Execute workflows and automations
- Integrate with external systems and APIs
- Provide context-aware responses based on their specialization

Each agent has a unique configuration, capabilities, and access permissions, allowing organizations to deploy multiple specialized agents tailored to different use cases.

### Agent Categories

AI4W provides two main categories of agents:

#### AI Agents

AI Agents leverage artificial intelligence and machine learning to provide intelligent assistance:

- **Search Agent**: Retrieves and synthesizes information from knowledge bases and documents
- **API Agent**: Integrates with external APIs to fetch data and perform actions
- **Prompt Agent**: Processes natural language prompts to generate responses using LLMs
- **Autonomous Agent**: Operates independently to complete complex tasks with minimal human intervention
- **Agentic Flows**: Orchestrates multiple agents and workflows to accomplish sophisticated objectives

#### Other Agents

Other Agents extend functionality through integrations and automations:

- **Bot Agents**: Conversational bots built using Kore.ai's bot platform for specific use cases
- **Workflow Agents**: Execute predefined workflows and business process automations

### Agent Architecture

```
┌─────────────────────────────────────────────────────┐
│                   EVA Web SDK                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│         ┌──────────┐      ┌──────────┐              │
│         │   All    │      │  Common  │              │
│         │  Agents  │      │  Agents  │              │
│         └──────────┘      └──────────┘              │
│                                                     │
│                 ┌──────────┐                        │
│                 │  Recent  │                        │
│                 │  Agents  │                        │
│                 └──────────┘                        │
│                                                     │
└─────────────────────────────────────────────────────┘
                      ▼
              ┌───────────────┐
              │   User Chat   │
              └───────────────┘
```

## Accessing Agents

The EVA Web SDK provides three distinct API functions to retrieve and access agent data. Each function returns a different subset of agents based on their status, usage, or organizational configuration:

### 1. AllAgents() - Retrieve All Agents

The `AllAgents()` function returns the **complete list of all agents** available in your EVA instance, including both AI Agents and Other Agents, regardless of their enabled status or usage.

**What it returns:**
- All configured agents (AI Agents: Search, API, Prompt, Autonomous, Agentic Flows)
- All Other Agents (Bot Agents, Workflow Agents)
- Both enabled and disabled agents

**Use Cases:**
- Admin interfaces showing all available agents
- Agent management dashboards
- Complete agent catalogs
- Configuration interfaces

**Example:**
```javascript
import { AllAgents } from 'eva-web-sdk/agents';

const result = await AllAgents();
console.log(result.data); // Array of all agents
```

### 2. CommonAgents() - Retrieve Common Agents

The `CommonAgents()` function returns **frequently used or highlighted agents** marked as "common" by your organization.

**What it returns:**
- Agents marked as "common" in your organization's configuration
- Typically includes the most frequently used agents
- Usually limited to 3-5 key agents for quick access

**Use Cases:**
- Quick access menus
- Featured agents section
- Common actions toolbar
- Onboarding experiences
- Default agent suggestions

**Example:**
```javascript
import { CommonAgents } from 'eva-web-sdk/agents';

const result = await CommonAgents();
console.log(result.data); // Array of common agents
```

### 3. RecentAgents() - Retrieve User's Recent Agent IDs

The `RecentAgents()` function returns **an array of agent IDs** for agents recently used by the current user, ordered by most recent usage (newest first).

**What it returns:**
- Directly returns an array of strings (agent IDs), not wrapped in a response object
- Format: `["ag-********-****-****-****-************", ...]`
- Ordered by last usage timestamp (most recent first)
- Only includes IDs of enabled agents
- Personalized per user
- Must be matched with AllAgents() data to get full agent information

**Use Cases:**
- Recently used section
- User personalization
- Quick agent switching
- Workflow continuity
- Smart suggestions based on user history

**Example:**
```javascript
import { RecentAgents } from 'eva-web-sdk/agents';

const recentAgentIds = await RecentAgents();
console.log(recentAgentIds); 
// Returns: ["ag-********-****-****-****-************", "ag-********-****-****-****-************", ...]
```

**Getting Full Agent Details:**

Since RecentAgents() returns only agent IDs, you need to match them with full agent data from AllAgents():

```javascript
import { RecentAgents, AllAgents } from 'eva-web-sdk/agents';

async function getRecentAgentsWithDetails() {
  // Get recent agent IDs (array of strings)
  const recentIds = await RecentAgents();
  
  // Get all agents
  const allResult = await AllAgents();
  const allAgents = allResult.data || [];
  
  // Match IDs with full agent objects
  const recentAgents = recentIds
    .map(id => allAgents.find(agent => agent.id === id))
    .filter(agent => agent !== undefined);
  
  return recentAgents;
}

// Usage
const recentAgents = await getRecentAgentsWithDetails();
console.log(recentAgents); // Array of full agent objects
```

## Agent Properties

Each agent object contains comprehensive information about the agent's configuration, metadata, and operational state.

### Complete Agent Object Structure

```javascript
{
  // Core Identification
  id: "ag-********-****-****-****-************",
  version: "0.0.0",
  versionName: "1.0.0",
  state: 0,
  
  // Basic Information
  name: "Document Analyzer",
  description: "Analyzes documents and extracts key information using AI",
  purpose: "Document analysis and information extraction",
  type: "gptAgent",
  
  // Configuration
  sampleQuery: [],
  agentChatExpiry: {
    enable: false,
    duration: 1
  },
  notifications: {
    enable: false,
    token: "****************************************"
  },
  
  // Ownership & Audit
  createdBy: "u-********-****-****-****-************",
  updatedBy: "u-********-****-****-****-************",
  createdOn: "2025-09-12T10:59:02.380Z",
  lastPublishedOn: "2025-09-12T10:59:02.380Z",
  lMod: "2025-09-12T10:59:02.000Z",
  
  // Lifecycle Management
  changeLogs: [],
  discardable: true,
  publishable: true,
  publishedVersion: 0,
  
  // Capabilities & Behavior
  custom: true,
  capabilities: [],
  isFallback: false,
  enablement: "mandatory",
  
  // Organization Context
  accountId: "ac-********-****-****-****-************",
  wsId: "ws-********-****-****-****-************",
  ownerId: "u-********-****-****-****-************",
  
  // Status & Display
  enabled: true,
  icon: "https://staticqa-kora.kore.ai/kora/icons/lib/message/blue.svg",
  
  // Workspace Information
  workspaceInfo: {
    name: "Enterprise workspace",
    logo: {
      type: "emoji",
      val: {
        category: "symbols",
        unicode: "2734"
      }
    },
    isDefaultWS: true
  }
}
```

### Property Reference

#### Core Identification

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the agent. Format: `ag-[UUID]` |
| `version` | `string` | Current version number of the agent (e.g., "0.0.0", "1.2.3") |
| `versionName` | `string` | Human-readable version name displayed in UI (e.g., "1.0.0") |
| `state` | `number` | Agent lifecycle state: `0` = Draft, `1` = Published|

#### Basic Information

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Display name of the agent shown to end users |
| `description` | `string` | Detailed description of agent's capabilities and purpose |
| `purpose` | `string` | Short statement of the agent's primary function |
| `type` | `string` | Agent type: `gptAgent`, `searchAgent`, `apiAgent`, `workflowAgent`, `botAgent`, etc. |

#### Configuration

| Property | Type | Description |
|----------|------|-------------|
| `sampleQuery` | `array` | Array of sample queries/utterances to help users understand agent capabilities |
| `agentChatExpiry` | `object` | Chat session expiration settings |
| `agentChatExpiry.enable` | `boolean` | Whether chat expiration is enabled |
| `agentChatExpiry.duration` | `number` | Expiration duration in hours |
| `notifications` | `object` | Notification configuration for the agent |
| `notifications.enable` | `boolean` | Whether notifications are enabled |
| `notifications.token` | `string` | Secure token for notification system |

#### Ownership & Audit

| Property | Type | Description |
|----------|------|-------------|
| `createdBy` | `string` | User ID of the person who created the agent. Format: `u-[UUID]` |
| `updatedBy` | `string` | User ID of the person who last updated the agent |
| `createdOn` | `string` | ISO 8601 timestamp when the agent was created |
| `lastPublishedOn` | `string` | ISO 8601 timestamp when the agent was last published |
| `lMod` | `string` | Last modification timestamp (ISO 8601 format) |

#### Lifecycle Management

| Property | Type | Description |
|----------|------|-------------|
| `changeLogs` | `array` | Array of change log entries documenting agent modifications |
| `discardable` | `boolean` | Whether the agent can be discarded/deleted |
| `publishable` | `boolean` | Whether the agent can be published |
| `publishedVersion` | `number` | Version number of the currently published agent (0 if unpublished) |

#### Capabilities & Behavior

| Property | Type | Description |
|----------|------|-------------|
| `custom` | `boolean` | Whether this is a custom agent (true) or system agent (false) |
| `capabilities` | `array` | Array of capability identifiers the agent supports |
| `isFallback` | `boolean` | Whether this agent serves as a fallback when no other agent matches |
| `enablement` | `string` | Agent enablement mode: `mandatory`, `optional`, `disabled` |

#### Organization Context

| Property | Type | Description |
|----------|------|-------------|
| `accountId` | `string` | Account ID the agent belongs to. Format: `ac-[UUID]` |
| `wsId` | `string` | Workspace ID where the agent is deployed. Format: `ws-[UUID]` |
| `ownerId` | `string` | User ID of the agent owner (may differ from creator) |

#### Status & Display

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | Whether the agent is currently enabled and available for use |
| `icon` | `string` | URL to the agent's icon/avatar image displayed in UI |

#### Workspace Information

| Property | Type | Description |
|----------|------|-------------|
| `workspaceInfo` | `object` | Information about the workspace this agent belongs to |
| `workspaceInfo.name` | `string` | Display name of the workspace |
| `workspaceInfo.logo` | `object` | Workspace logo configuration |
| `workspaceInfo.logo.type` | `string` | Logo type: `emoji`, `image`, `icon` |
| `workspaceInfo.logo.val` | `object` | Logo value object (structure depends on type) |
| `workspaceInfo.isDefaultWS` | `boolean` | Whether this is the default workspace |

### Agent Type Values

The `type` property can have the following values:

| Type Value | Description | Category |
|------------|-------------|----------|
| `gptAgent` | GPT-powered prompt agent using LLMs | AI Agent |
| `searchAgent` | Document search and retrieval agent | AI Agent |
| `apiAgent` | API integration agent | AI Agent |
| `autonomousAgent` | Autonomous decision-making agent | AI Agent |
| `agenticFlow` | Multi-agent orchestration flow | AI Agent |
| `botAgent` | Conversational bot agent | Other Agent |
| `workflowAgent` | Workflow automation agent | Other Agent |

### State Values

The `state` property indicates the agent's lifecycle state:

| State | Value | Description |
|-------|-------|-------------|
| Draft | `0` | Agent is in draft mode, not published |
| Published | `1` | Agent is published and available for use |
| Archived | `2` | Agent is archived and no longer active |

### Enablement Values

The `enablement` property controls agent availability:

| Enablement | Description |
|------------|-------------|
| `mandatory` | Agent is always available and cannot be disabled by users |
| `optional` | Agent is available but can be disabled by users |
| `disabled` | Agent is disabled and not available for use |

## API Reference

### AllAgents()

Fetches all agents available in the EVA instance.

**Syntax:**
```javascript
import { AllAgents } from 'eva-web-sdk/agents';

const result = await AllAgents();
```

**Returns:**
```javascript
{
  status: "succeeded" | "failed",
  error: null | ErrorObject,
  data: Agent[] // Array of all agent objects
}
```

**Response Example:**
```javascript
{
  status: "succeeded",
  error: null,
  data: [
    {
      id: "agent-001",
      name: "Data Analyzer",
      enabled: true,
      icon: "https://cdn.eva.ai/agents/analyzer.png",
      // ... other properties
    },
    {
      id: "agent-002",
      name: "Code Generator",
      enabled: false,
      icon: "https://cdn.eva.ai/agents/coder.png",
      // ... other properties
    }
  ]
}
```

**Implementation Details:**
- Automatically called during SDK initialization
- Subscribes to Redux store for state updates
- Returns a Promise that resolves when data is loaded
- No parameters required

---

### CommonAgents()

Fetches agents marked as "common" or frequently used.

**Syntax:**
```javascript
import { CommonAgents } from 'eva-web-sdk/agents';

const result = await CommonAgents();
```

**Returns:**
```javascript
{
  status: "succeeded" | "failed",
  error: null | ErrorObject,
  data: Agent[] // Array of common agents
}
```

**Response Example:**
```javascript
{
  status: "succeeded",
  error: null,
  data: [
    {
      id: "agent-summarizer",
      name: "Summarizer",
      enabled: true,
      // ... other properties
    },
    {
      id: "agent-assistant",
      name: "General Assistant",
      enabled: true,
      // ... other properties
    }
  ]
}
```

**Implementation Details:**
- Returns agents marked as common in backend configuration
- Typically 3-5 agents for quick access
- Can be customized per organization

---

### RecentAgents()

Fetches agent IDs of agents recently used by the current user.

**Syntax:**
```javascript
import { RecentAgents } from 'eva-web-sdk/agents';

const recentAgentIds = await RecentAgents();
```

**Returns:**
```javascript
string[] // Array of agent IDs, ordered by usage
```

**Response Example:**
```javascript
[
  "ag-********-****-****-****-************",
  "ag-********-****-****-****-************",
  "ag-********-****-****-****-************",
  "ag-********-****-****-****-************",
  "ag-********-****-****-****-************"
  // ... more agent IDs
]
```

**Implementation Details:**
- Returns array of agent IDs (strings only, not full agent objects)
- Ordered by most recent usage first (newest at index 0)
- Only includes IDs of enabled agents
- Updated automatically when user interacts with agents
- Must be matched with AllAgents() data to get full agent details

**Getting Full Agent Objects:**

```javascript
import { RecentAgents, AllAgents } from 'eva-web-sdk/agents';

async function getRecentAgentsDetails() {
  const [recentIds, allResult] = await Promise.all([
    RecentAgents(),
    AllAgents()
  ]);
  
  const allAgents = allResult.data || [];
  
  // Map IDs to full agent objects
  return recentIds
    .map(id => allAgents.find(agent => agent.id === id))
    .filter(Boolean);
}
```

## Usage Examples

### Example 1: Display All Agents in a List

```javascript
import React, { useEffect, useState } from 'react';
import { AllAgents } from 'eva-web-sdk/agents';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const result = await AllAgents();
      
      if (result.status === 'succeeded') {
        setAgents(result.data);
      } else {
        console.error('Failed to load agents:', result.error);
      }
    } catch (error) {
      console.error('Error loading agents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading agents...</div>;

  return (
    <div className="agent-list">
      <h2>All Agents</h2>
      <ul>
        {agents.map(agent => (
          <li key={agent.id} className="agent-item">
            <img src={agent.icon} alt={agent.name} width="24" height="24" />
            <span>{agent.name}</span>
            <span className={agent.enabled ? 'enabled' : 'disabled'}>
              {agent.enabled ? 'Active' : 'Inactive'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;
```

### Example 2: Agent Selector

```javascript
import React, { useEffect, useState } from 'react';
import { AllAgents } from 'eva-web-sdk/agents';
import { ChatInterface } from 'eva-web-sdk/chat';

function AgentSelector({ onAgentSelect }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    const result = await AllAgents();
    if (result.status === 'succeeded') {
      // Filter to show only enabled agents
      const enabledAgents = result.data.filter(agent => agent.enabled);
      setAgents(enabledAgents);
    }
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    
    // Set agent context for chat
    ChatInterface().setAgentContext(agent);
    
    // Notify parent component
    if (onAgentSelect) {
      onAgentSelect(agent);
    }
  };

  return (
    <div className="agent-selector">
      <h3>Select an Agent</h3>
      <div className="agent-grid">
        {agents.map(agent => (
          <button
            key={agent.id}
            className={`agent-card ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
            onClick={() => handleAgentClick(agent)}
          >
            <img src={agent.icon} alt={agent.name} />
            <h4>{agent.name}</h4>
            <p>{agent.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AgentSelector;
```

### Example 3: Quick Access with Common Agents

```javascript
import React, { useEffect, useState } from 'react';
import { CommonAgents } from 'eva-web-sdk/agents';
import { InitiateChatConversationAction } from 'eva-web-sdk/chat';

function QuickAccessAgents() {
  const [commonAgents, setCommonAgents] = useState([]);

  useEffect(() => {
    loadCommonAgents();
  }, []);

  const loadCommonAgents = async () => {
    const result = await CommonAgents();
    if (result.status === 'succeeded') {
      setCommonAgents(result.data);
    }
  };

  const handleAgentInvoke = (agent) => {
    const payload = {
      intent: "welcome",
      question: `How can the "${agent.name}" agent assist me?`,
      source: agent.id
    };
    
    InitiateChatConversationAction({ payload });
  };

  return (
    <div className="quick-access-toolbar">
      {commonAgents.map(agent => (
        <button
          key={agent.id}
          className="quick-access-button"
          onClick={() => handleAgentInvoke(agent)}
          title={agent.description}
        >
          <img src={agent.icon} alt={agent.name} width="18" height="18" />
          <span>{agent.name}</span>
        </button>
      ))}
    </div>
  );
}

export default QuickAccessAgents;
```

### Example 4: Recent Agents for Personalization

```javascript
import React, { useEffect, useState } from 'react';
import { RecentAgents, AllAgents } from 'eva-web-sdk/agents';

function PersonalizedAgentView() {
  const [recentAgents, setRecentAgents] = useState([]);
  const [otherAgents, setOtherAgents] = useState([]);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    // Load recent agent IDs and all agents in parallel
    const [recentIds, allResult] = await Promise.all([
      RecentAgents(),
      AllAgents()
    ]);

    if (allResult.status === 'succeeded') {
      const allAgents = allResult.data;
      
      // Map IDs to full agent objects
      const recentAgentObjects = recentIds
        .map(id => allAgents.find(agent => agent.id === id))
        .filter(agent => agent !== undefined);
      
      setRecentAgents(recentAgentObjects);
      
      // Filter out recent agents and show only enabled ones
      const other = allAgents.filter(
        agent => agent.enabled && !recentIds.includes(agent.id)
      );
      setOtherAgents(other);
    }
  };

  return (
    <div className="agent-view">
      {recentAgents.length > 0 && (
        <section className="recent-section">
          <h3>📌 Recently Used</h3>
          <div className="agent-list">
            {recentAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>
      )}

      <section className="all-agents-section">
        <h3>All Agents</h3>
        <div className="agent-list">
          {otherAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <img src={agent.icon} alt={agent.name} />
      <h4>{agent.name}</h4>
      <p>{agent.description}</p>
    </div>
  );
}

export default PersonalizedAgentView;
```

### Example 5: Agent Search and Filter

```javascript
import React, { useEffect, useState } from 'react';
import { AllAgents } from 'eva-web-sdk/agents';

function AgentSearch() {
  const [allAgents, setAllAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEnabled, setFilterEnabled] = useState('all'); // 'all', 'enabled', 'disabled'

  useEffect(() => {
    loadAllAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [searchTerm, filterEnabled, allAgents]);

  const loadAllAgents = async () => {
    const result = await AllAgents();
    if (result.status === 'succeeded') {
      setAllAgents(result.data);
      setFilteredAgents(result.data);
    }
  };

  const filterAgents = () => {
    let filtered = [...allAgents];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by enabled status
    if (filterEnabled === 'enabled') {
      filtered = filtered.filter(agent => agent.enabled);
    } else if (filterEnabled === 'disabled') {
      filtered = filtered.filter(agent => !agent.enabled);
    }

    setFilteredAgents(filtered);
  };

  return (
    <div className="agent-search">
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterEnabled}
          onChange={(e) => setFilterEnabled(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Agents</option>
          <option value="enabled">Enabled Only</option>
          <option value="disabled">Disabled Only</option>
        </select>
      </div>

      <div className="search-results">
        <p>{filteredAgents.length} agents found</p>
        <div className="agent-grid">
          {filteredAgents.map(agent => (
            <div key={agent.id} className="agent-card">
              <img src={agent.icon} alt={agent.name} />
              <h4>{agent.name}</h4>
              <p>{agent.description}</p>
              <span className={`status ${agent.enabled ? 'enabled' : 'disabled'}`}>
                {agent.enabled ? '✓ Enabled' : '✗ Disabled'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentSearch;
```

## Advanced Usage

### Accessing Agents from Redux Store

If you need direct access to agent data from the Redux store:

```javascript
import { store } from 'eva-web-sdk';

// Get current agent state
const state = store.getState().global;

// All agents with API response status
const allAgentsResponse = state.allAgents;
console.log(allAgentsResponse.status); // 'loading', 'succeeded', 'failed'
console.log(allAgentsResponse.data);   // Agent data

// Common agents array
const commonAgents = state.commonAgents;

// Recent agent IDs
const recentAgentIds = state.recentAgents;

// Subscribe to agent updates
const unsubscribe = store.subscribe(() => {
  const newState = store.getState().global;
  console.log('Agents updated:', newState.allAgents);
});

// Unsubscribe when done
unsubscribe();
```

### Manually Fetching Agents

If you need to manually trigger an agent fetch (refresh):

```javascript
import { store } from 'eva-web-sdk';

// Import the Redux action
import { fetchAgents } from 'eva-web-sdk';

// Manually dispatch fetch agents
const userId = window.sdkConfig.userId;
await store.dispatch(fetchAgents({ userId }));

// Agent data will be updated in the store
const agents = store.getState().global.allAgents.data;
```

### Custom Agent Filtering

Filter agents by category:

```javascript
import { AllAgents } from 'eva-web-sdk/agents';

async function getAgentsByCategory(category) {
  const result = await AllAgents();
  
  if (result.status === 'succeeded') {
    return result.data.filter(agent => agent.category === category);
  }
  
  return [];
}

// Usage
const productivityAgents = await getAgentsByCategory('Productivity');
const dataAgents = await getAgentsByCategory('Data Analysis');
```

Filter agents by type:

```javascript
import { AllAgents } from 'eva-web-sdk/agents';

async function getAgentsByType(type) {
  const result = await AllAgents();
  
  if (result.status === 'succeeded') {
    return result.data.filter(agent => agent.type === type);
  }
  
  return [];
}

// Usage
const searchAgents = await getAgentsByType('search');
const apiAgents = await getAgentsByType('api');
const promptAgents = await getAgentsByType('prompt');
const botAgents = await getAgentsByType('bot');
```

Filter by agent classification (AI Agent vs Other Agent):

```javascript
async function getAIAgents() {
  const result = await AllAgents();
  
  if (result.status === 'succeeded') {
    return result.data.filter(agent => agent.agentType === 'AI Agent');
  }
  
  return [];
}

async function getOtherAgents() {
  const result = await AllAgents();
  
  if (result.status === 'succeeded') {
    return result.data.filter(agent => agent.agentType === 'Other Agent');
  }
  
  return [];
}

// Usage
const aiAgents = await getAIAgents();
const otherAgents = await getOtherAgents();
```

### Combining Multiple Agent APIs

```javascript
async function getComprehensiveAgentView() {
  const [allResult, recentIds, commonResult] = await Promise.all([
    AllAgents(),
    RecentAgents(),
    CommonAgents()
  ]);

  const allAgents = allResult.data || [];
  
  // Map recent IDs to full agent objects
  const recentAgents = recentIds
    .map(id => allAgents.find(agent => agent.id === id))
    .filter(Boolean);
  
  return {
    all: allAgents,
    recentIds: recentIds,
    recent: recentAgents,
    common: commonResult.data || [],
    enabled: allAgents.filter(a => a.enabled)
  };
}

// Usage
const agentView = await getComprehensiveAgentView();
console.log('Total agents:', agentView.all.length);
console.log('Recent agent IDs:', agentView.recentIds.length);
console.log('Recent agents (full objects):', agentView.recent.length);
console.log('Common agents:', agentView.common.length);
console.log('Enabled agents:', agentView.enabled.length);
```

## Best Practices

### 1. Use Appropriate Agent Retrieval Function

Choose the right API function for your use case:

```javascript
// ✅ Good: Filter enabled agents when needed
const result = await AllAgents();
if (result.status === 'succeeded') {
  const enabledAgents = result.data.filter(a => a.enabled);
  // Use enabledAgents for user-facing interfaces
}

// ✅ Good: Use RecentAgents for personalization
const recentIds = await RecentAgents(); // Returns array of agent IDs directly

// Map to full agent objects if needed
const allResult = await AllAgents();
const recentAgents = recentIds
  .map(id => allResult.data.find(agent => agent.id === id))
  .filter(Boolean);

// ✅ Good: Use CommonAgents for quick access
const commonResult = await CommonAgents();
```

### 2. Handle Loading and Error States

```javascript
async function loadAgentsWithErrorHandling() {
  try {
    const result = await AllAgents();
    
    if (result.status === 'succeeded') {
      return result.data;
    } else if (result.status === 'failed') {
      console.error('Failed to load agents:', result.error);
      // Show user-friendly error message
      return [];
    }
  } catch (error) {
    console.error('Unexpected error loading agents:', error);
    return [];
  }
}
```

### 3. Cache Agent Data

```javascript
let agentCache = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getAgentsWithCache() {
  const now = Date.now();
  
  if (agentCache && cacheTime && (now - cacheTime) < CACHE_DURATION) {
    return agentCache;
  }
  
  const result = await AllAgents();
  if (result.status === 'succeeded') {
    agentCache = result.data;
    cacheTime = now;
  }
  
  return agentCache;
}
```

### 4. Implement Proper Agent Selection UI

```javascript
function AgentSelector({ onSelect }) {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (agent) => {
    setSelected(agent);
    onSelect(agent);
    
    // Provide visual feedback
    toast.success(`${agent.name} selected`);
  };

  return (
    <div className="agent-selector">
      {agents.map(agent => (
        <button
          key={agent.id}
          onClick={() => handleSelect(agent)}
          className={selected?.id === agent.id ? 'selected' : ''}
          disabled={!agent.enabled}
        >
          <img src={agent.icon} alt={agent.name} />
          <span>{agent.name}</span>
        </button>
      ))}
    </div>
  );
}
```

### 5. Optimize Re-renders

```javascript
import React, { useEffect, useState, useMemo } from 'react';
import { AllAgents } from 'eva-web-sdk/agents';

function OptimizedAgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    AllAgents().then(result => {
      if (result.status === 'succeeded') {
        // Filter enabled agents
        const enabledAgents = result.data.filter(a => a.enabled);
        setAgents(enabledAgents);
      }
    });
  }, []); // Load once

  // Memoize sorted agents
  const sortedAgents = useMemo(() => {
    return [...agents].sort((a, b) => a.name.localeCompare(b.name));
  }, [agents]);

  return (
    <div>
      {sortedAgents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Issue: Agents Not Loading

**Symptoms:**
- Agent APIs return empty arrays
- Status shows 'loading' indefinitely

**Solutions:**

1. **Ensure SDK is initialized:**
```javascript
// Make sure initializeSDK() is called first
await initializeSDK(config);

// Then access agents
const agents = await AllAgents();
```

2. **Check network connectivity:**
```javascript
const result = await AllAgents();
if (result.status === 'failed') {
  console.error('Network error:', result.error);
}
```

3. **Verify authentication:**
```javascript
// Check if access token is valid
console.log('Access token:', window.sdkConfig.accessToken);
```

### Issue: Agents Array is Empty

**Cause:** No agents configured in EVA instance

**Solution:**
- Contact your EVA administrator to configure agents
- Check if agents are enabled in the EVA admin portal

### Issue: Recent Agents Not Updating

**Cause:** Recent agents are only updated when user interacts with agents

**Solution:**
```javascript
// Recent agents update automatically after agent invocation
import { InitiateChatConversationAction } from 'eva-web-sdk/chat';

const payload = {
  intent: "welcome",
  source: agent.id // Using an agent updates recent agents
};

InitiateChatConversationAction({ payload });
```

**Note:** RecentAgents() returns an array of agent IDs directly, not full agent objects. You need to map these IDs to agent data from AllAgents() to get full details:

```javascript
const [recentIds, allResult] = await Promise.all([
  RecentAgents(),
  AllAgents()
]);

const allAgents = allResult.data || [];

const recentAgents = recentIds
  .map(id => allAgents.find(agent => agent.id === id))
  .filter(Boolean);
```

### Issue: Agent Icons Not Displaying

**Solutions:**

1. **Check icon URL validity:**
```javascript
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Use fallback icon
<img 
  src={isValidUrl(agent.icon) ? agent.icon : '/default-agent-icon.png'}
  alt={agent.name}
  onError={(e) => { e.target.src = '/default-agent-icon.png'; }}
/>
```

2. **Handle CORS issues:**
Ensure agent icon URLs are accessible from your domain

### Issue: TypeError: Cannot read property 'data' of undefined

**Cause:** Accessing agent data before it's loaded

**Solution:**
```javascript
// ❌ Bad
const agents = await AllAgents();
console.log(agents.data); // May be undefined

// ✅ Good
const agents = await AllAgents();
if (agents && agents.status === 'succeeded' && agents.data) {
  console.log(agents.data);
}
```

## Next Steps

Now that you understand how to work with agents, explore:

- [Chat Integration](./chat-integration) - Using agents in conversations
- [File Management](./file-management) - Handling files with agents
- [Advanced Patterns](../examples/advanced-patterns) - Complex agent workflows

## Support

For additional help:
- **Email**: support@kore.ai
- **Community**: [community.kore.ai](https://community.kore.ai)
- **Documentation**: [docs.kore.ai](https://docs.kore.ai)

---

**Last Updated:** October 28, 2025  
**SDK Version:** 1.1.60

Copyright © 2025 Kore.ai, Inc.

