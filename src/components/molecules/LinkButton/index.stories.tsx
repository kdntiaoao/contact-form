import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LinkButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/LinkButton',
  component: LinkButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    href: {
      control: { type: 'text' },
      defaultValue: '/',
      description: '遷移先',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'お問い合わせ一覧',
      description: 'リンクテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof LinkButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
