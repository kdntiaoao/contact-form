import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../../firebase/client'

import { ContactInfo } from 'types/data'

export const getContactInfo = async (contactId: string): Promise<ContactInfo | null> => {
  const contactInfoSnap = await getDoc(doc(db, 'contactInfo', contactId))

  // データ取得に成功した場合
  if (contactInfoSnap.exists()) {
    const contactInfo = contactInfoSnap.data() as ContactInfo
    return contactInfo
  } else {
    console.log('contactInfoSnap is empty.')
    return null
  }
}
