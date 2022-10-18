import React, { useCallback } from 'react'

import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ChatForm } from '.'

import { ChatFormInputType } from 'types/input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/ChatForm',
  component: ChatForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    error: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'エラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      description: 'エラーを閉じるイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      defaultValue: 'エラーが発生しました',
      description: 'エラーメッセージ',
      table: {
        type: { summary: 'string' },
      },
    },
    onSubmit: {
      description: '入力データを送信するイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    control: {
      table: {
        type: { summary: 'object' },
      },
    },
  },
} as ComponentMeta<typeof ChatForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChatForm> = (args) => {
  const { handleSubmit, control, setValue } = useForm<ChatFormInputType>({
    mode: 'onChange',
    defaultValues: {
      text: '',
    },
  })
  // eslint-disable-next-line no-unused-vars
  const [_, updateArgs] = useArgs()

  const handleClose = (): void => {
    updateArgs({ error: false })
  }

  const onSubmit: SubmitHandler<ChatFormInputType> = useCallback(() => {
    setValue('text', '')
  }, [setValue])

  return <ChatForm {...args} control={control} onClose={handleClose} onSubmit={handleSubmit(onSubmit)} />
}

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
