import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ChatList } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/ChatList',
  component: ChatList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    admin: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: '管理者フラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    chatData: {
      control: { type: 'object' },
      defaultValue: [
        { contributor: '0', contributorName: '田中太郎', postTime: 1664030961535, contents: { text: 'Hello, world!' } },
        {
          contributor: 'OtL4a3q2C1QzwK4sXmXp3s3ha4C2',
          contributorName: '山田花子',
          postTime: 1664030974622,
          contents: { newStatus: 1 },
        },
        {
          contributor: 'OtL4a3q2C1QzwK4sXmXp3s3ha4C2',
          contributorName: '山田花子',
          postTime: 1664030974722,
          contents: { text: 'Hello, world!' },
        },
        {
          contributor: '0',
          contributorName: '田中太郎',
          postTime: 1664367225909,
          contents: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tellus a leo molestie consectetur et ac tortor. Vestibulum volutpat, dolor eu aliquam auctor, quam diam malesuada ante, ac eleifend elit magna in dui. Sed tincidunt faucibus vestibulum. Sed accumsan, turpis vel molestie placerat, tellus massa laoreet eros, et rutrum nisl lectus nec magna. Nullam eget magna pellentesque, condimentum est ac, dignissim metus. Integer ullamcorper aliquam eros. Ut vehicula arcu eget ipsum facilisis mollis. Aliquam porta viverra dolor vitae gravida. Quisque suscipit ex mauris, quis scelerisque erat finibus eu. Aliquam vulputate purus scelerisque dolor iaculis ornare. Morbi et finibus quam. Suspendisse consectetur tempus pharetra. Aenean fermentum, enim eget molestie lacinia, turpis leo rhoncus arcu, a porttitor risus nunc sed urna. Nulla facilisi. Aliquam mattis varius sodales. Nullam sit amet pharetra erat.',
          },
        },
      ],
      description: 'チャットリスト',
      table: {
        type: { summary: 'object' },
      },
    },
  },
} as ComponentMeta<typeof ChatList>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChatList> = (args) => <ChatList {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
