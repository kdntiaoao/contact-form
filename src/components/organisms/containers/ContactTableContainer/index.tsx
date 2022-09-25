import { memo } from 'react'

import { format } from 'date-fns'

import { ContactTable } from 'components/organisms/presentations/ContactTable'
import { ContactInfo } from 'types/data'

type Data = Omit<ContactInfo, 'email'>

export type HeadCell = {
  id: keyof Data
  label: string
}

type Props = {
  contactInfoList: Record<string, ContactInfo>
}

const headCells: HeadCell[] = [
  { id: 'currentStatus', label: '対応状況' },
  { id: 'name', label: '氏名' },
  { id: 'tel', label: '電話番号' },
  { id: 'category', label: '製品種別' },
  { id: 'submitTime', label: 'お問い合わせ日時' },
  { id: 'contents', label: 'お問い合わせ内容' },
  { id: 'supporter', label: '担当者' },
]

// eslint-disable-next-line react/display-name
export const ContactTableContainer = memo(({ contactInfoList }: Props) => {
  const contactInfoArray = Object.keys(contactInfoList).map((key) => {
    const { name, tel, category, contents, supporter, currentStatus, submitTime } = contactInfoList[key]
    return {
      name,
      tel,
      category,
      contents: contents.length <= 100 ? contents : contents.slice(0, 100) + '...',
      supporter,
      currentStatus,
      submitTime: format(submitTime, 'M月d日 H:mm'),
      timestamp: submitTime,
      key: key,
    }
  })
  contactInfoArray.sort((a, b) => {
    return a.currentStatus !== b.currentStatus ? a.currentStatus - b.currentStatus : a.timestamp - b.timestamp
  })

  return <ContactTable headCells={headCells} contactInfoArray={contactInfoArray} />
})
