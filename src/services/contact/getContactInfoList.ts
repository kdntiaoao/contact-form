import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { ContactInfo } from 'types/data'

export const getContactInfoList = async (firebaseAdmin: boolean = false): Promise<Record<string, ContactInfo> | null> => {
  const contactInfoListSnap = firebaseAdmin
    ? await adminDb.collection('contactInfo').get()
    : await getDocs(collection(db, 'contactInfo'))

  // データ取得に失敗した場合
  if (contactInfoListSnap.empty) {
    console.log('contactInfoListSnap is empty.')
    return null
  }

  // データ取得に成功した場合
  const contactInfoList: Record<string, ContactInfo> = {}
  contactInfoListSnap.forEach((doc) => {
    const data = doc.data() as ContactInfo
    contactInfoList[doc.id] = data
  })
  return contactInfoList
}
