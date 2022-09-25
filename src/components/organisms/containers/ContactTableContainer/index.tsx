import { memo } from 'react'

import { ContactTable } from 'components/organisms/presentations/ContactTable'
import { ContactInfo } from 'types/data'

type Props = {
  contactInfoList: Record<string, ContactInfo>
}

// eslint-disable-next-line react/display-name
export const ContactTableContainer = memo(({ contactInfoList }: Props) => {
  const contactInfoArray = Object.keys(contactInfoList).map((key) => {
    const { name, tel, category, contents, supporter, currentStatus, submitTime } = contactInfoList[key]
    return {
      name,
      tel,
      category,
      contents,
      supporter,
      currentStatus,
      submitTime,
      key: key,
    }
  })
  contactInfoArray.sort((a, b) => {
    return a.currentStatus !== b.currentStatus ? a.currentStatus - b.currentStatus : a.submitTime - b.submitTime
  })

  return <ContactTable contactInfoArray={contactInfoArray} />
})
