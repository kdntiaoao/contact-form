import React from 'react'

import { Button } from '@mui/material'
import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AlertDialog } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: '対応を完了しますか？',
      description: 'タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      defaultValue: '',
      description: '説明文',
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      control: { type: 'object' },
      defaultValue: ['キャンセル', '完了する'],
      description: '選択肢の文言',
      table: {
        type: {
          summary: 'object',
        },
      },
    },
    open: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'オープンフラグ',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onClose: {
      description: 'メニューを閉じるイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof AlertDialog>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AlertDialog> = (args) => {
  // eslint-disable-next-line no-unused-vars
  const [_, updateArgs] = useArgs()

  const handleOpen = (): void => {
    updateArgs({ open: true })
  }

  const handleClose = (): void => {
    updateArgs({ open: false })
  }

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <AlertDialog {...args} onClose={handleClose} />
    </>
  )
}

export const Normal = Template.bind({})
