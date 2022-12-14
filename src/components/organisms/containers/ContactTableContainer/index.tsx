import { memo } from 'react'

import { ContactTable } from 'components/organisms/presentations/ContactTable'
import { ContactInfoList, SupporterList } from 'types/data'

type Props = {
  tableTitle: string
  contactInfoList: ContactInfoList
  supporterList: SupporterList
  uid: string
}

const currentStatusArray: ['未対応', '対応中', '対応完了'] = ['未対応', '対応中', '対応完了']
const currentStatusColorArray: ['warning', 'info', 'success'] = ['warning', 'info', 'success']

// eslint-disable-next-line react/display-name
export const ContactTableContainer = memo(({ tableTitle, contactInfoList, supporterList, uid }: Props) => {
  const contactInfoArray = Object.keys(contactInfoList).map((key) => {
    const { name, tel, category, contents, supporter, currentStatus, submitTime } = contactInfoList[key]
    return {
      name,
      tel,
      category,
      contents,
      supporterId: supporter,
      supporter: supporter === '0' ? '-' : supporterList[supporter].name,
      supporterColor: supporter && supporterList[supporter] && supporterList[supporter].color,
      currentStatus,
      currentStatusInfo: { label: currentStatusArray[currentStatus], color: currentStatusColorArray[currentStatus] },
      submitTime,
      key: key,
    }
  })
  contactInfoArray.sort((a, b) => {
    return a.currentStatus !== b.currentStatus ? a.currentStatus - b.currentStatus : a.submitTime - b.submitTime
  })

  return <ContactTable tableTitle={tableTitle} contactInfoArray={contactInfoArray} uid={uid} />
})
