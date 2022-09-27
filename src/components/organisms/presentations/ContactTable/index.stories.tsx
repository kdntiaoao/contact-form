import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ContactTable } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/ContactTable',
  component: ContactTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    contactInfoArray: {
      control: { type: 'object' },
      defaultValue: [
        {
          name: '田中太郎',
          tel: '08000121234',
          category: 'A001',
          contents: 'Hello, world!',
          supporter: '-',
          currentStatus: 0,
          currentStatusInfo: { label: '未対応', color: 'warning' },
          submitTime: 1664031011430,
          key: 'a',
        },
        {
          name: '山田花子',
          tel: '08000121234',
          category: 'A002',
          contents: 'Hello, world!',
          supporter: '-',
          currentStatus: 0,
          currentStatusInfo: { label: '未対応', color: 'warning' },
          submitTime: 1664051011430,
          key: 'b',
        },
      ],
      description: 'お問い合わせ一覧',
      table: {
        type: { summary: 'object' },
      },
    },
  },
} as ComponentMeta<typeof ContactTable>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof ContactTable> = (args) => <ContactTable {...args} />

export const Normal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
