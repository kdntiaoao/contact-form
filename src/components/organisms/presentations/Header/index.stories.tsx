import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Header } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    menuList: {
      control: { type: 'object' },
      defaultValue: [
        [
          { text: 'ホーム', url: '/' },
          { text: 'お問い合わせ', url: '/contact' },
        ],
      ],
      description: 'メニューリスト',
      table: {
        type: { summary: 'object' },
      },
    },
  },
} as ComponentMeta<typeof Header>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
