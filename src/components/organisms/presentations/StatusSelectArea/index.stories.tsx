import React from 'react'

import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StatusSelectArea } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/StatusSelectArea',
  component: StatusSelectArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    direction: {
      control: { type: 'text' },
      defaultValue: 'row',
      description: '並ぶ方向',
      table: {
        type: { summary: 'string' },
      },
    },
    currentStatus: {
      control: { type: 'number' },
      defaultValue: 0,
      description: '現在の状態',
      table: {
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: '非活性フラグ',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onClick: {
      description: 'クリックイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof StatusSelectArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StatusSelectArea> = (args) => {
  // eslint-disable-next-line no-unused-vars
  const [_, updateArgs] = useArgs()

  const handleClick = (newStatus: number): void => {
    updateArgs({ currentStatus: newStatus })
  }

  return (
    <>
      <StatusSelectArea {...args} onClick={handleClick} />
    </>
  )
}

export const Normal = Template.bind({})
