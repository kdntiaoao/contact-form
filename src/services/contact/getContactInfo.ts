import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { ContactInfo } from 'types/data'

export const getContactInfo = async (
  contactId: string,
  firebaseAdmin: boolean = false
): Promise<ContactInfo | null> => {
  const contactInfoSnap = firebaseAdmin
    ? await adminDb.collection('contactInfo').doc(contactId).get()
    : await getDoc(doc(db, 'contactInfo', contactId))

  // データ取得に成功した場合
  if (
    (typeof contactInfoSnap.exists === 'boolean' && contactInfoSnap.exists) ||
    (typeof contactInfoSnap.exists === 'function' && contactInfoSnap.exists())
  ) {
    const contactInfo = contactInfoSnap.data() as ContactInfo
    return contactInfo
  } else {
    console.log('contactInfoSnap is empty.')
    return null
  }
}
