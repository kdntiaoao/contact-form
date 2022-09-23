import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { ChatData } from 'types/data'

export const getChatData = async (
  contactId: string,
  firebaseAdmin: boolean = false
): Promise<ChatData | null> => {
  const chatDataSnap = firebaseAdmin
    ? await adminDb.collection('chatData').doc(contactId).get()
    : await getDoc(doc(db, 'chatData', contactId))

  // データ取得に成功した場合
  if (
    (typeof chatDataSnap.exists === 'boolean' && chatDataSnap.exists) ||
    (typeof chatDataSnap.exists === 'function' && chatDataSnap.exists())
  ) {
    const chatData = chatDataSnap.data() as ChatData
    return chatData
  } else {
    console.log('chatDataSnap is empty.')
    return null
  }
}
