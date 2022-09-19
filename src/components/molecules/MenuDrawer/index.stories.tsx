import React from 'react'

import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MenuDrawer } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/MenuDrawer',
  component: MenuDrawer,
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
        type: {
          summary: 'object',
        },
      },
    },
    open: {
      control: { type: 'boolean' },
      defaultValue: true,
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
} as ComponentMeta<typeof MenuDrawer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MenuDrawer> = (args) => {
  // eslint-disable-next-line no-unused-vars
  const [_, updateArgs] = useArgs()
  const handleClose = (): void => {
    updateArgs({ open: false })
  }

  return <MenuDrawer {...args} onClose={handleClose} />
}

export const Normal = Template.bind({})
