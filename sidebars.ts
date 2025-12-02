import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction',
        'intro',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/initialization',
        'tutorials/agents',
        'tutorials/files',
      ],
      collapsed: false,
    },
    // Uncomment and add items when you're ready to add these sections:
    // {
    //   type: 'category',
    //   label: 'Using AI4W SDK',
    //   items: [
    //     // Add your usage guides here
    //   ],
    //   collapsed: false,
    // },
    // {
    //   type: 'category',
    //   label: 'API Reference',
    //   items: [
    //     // Add your API reference docs here
    //   ],
    //   collapsed: false,
    // },
    // {
    //   type: 'category',
    //   label: 'Guides',
    //   items: [
    //     // Add your guides here
    //   ],
    //   collapsed: false,
    // },
  ],
};

export default sidebars;
