import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Chat } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Chat',
  component: Chat,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    reverse: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'チャットの向きのフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    text: {
      control: { type: 'text' },
      defaultValue: 'Hello, world!',
      description: 'チャットのテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    contributor: {
      control: { type: 'text' },
      defaultValue: 'John',
      description: '投稿者',
      table: {
        type: { summary: 'string' },
      },
    },
    postTime: {
      control: { type: 'text' },
      defaultValue: '14:12',
      description: '投稿時刻',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof Chat>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Chat> = (args) => <Chat {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Reverse = Template.bind({})
Reverse.args = {
  reverse: true,
}
