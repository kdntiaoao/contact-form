import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PrimaryButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PrimaryButton',
  component: PrimaryButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'radio'},
    children: { control: 'text' },
  },
} as ComponentMeta<typeof PrimaryButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  backgroundColor: 'primary',
  children: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  backgroundColor: 'secondary',
  children: 'Secondary',
}
