import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoadingScreen } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/LoadingScreen',
  component: LoadingScreen,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'ローディングフラグ',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as ComponentMeta<typeof LoadingScreen>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingScreen> = (args) => <LoadingScreen {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Normal.args = {
  loading: true,
}
