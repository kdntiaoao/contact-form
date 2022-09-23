import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../../firebase/client'
import { adminDb } from '../../../firebase/server'

import { ChatData } from 'types/data'

export const getChatDataList = async (firebaseAdmin: boolean = false): Promise<Record<string, ChatData> | null> => {
  const chatDataListSnap = firebaseAdmin
    ? await adminDb.collection('chatData').get()
    : await getDocs(collection(db, 'chatData'))

  // データ取得に失敗した場合
  if (chatDataListSnap.empty) {
    console.log('chatDataListSnap is empty.')
    return null
  }

  // データ取得に成功した場合
  const chatDataList: Record<string, ChatData> = {}
  chatDataListSnap.forEach((doc) => {
    const data = doc.data() as ChatData
    chatDataList[doc.id] = data
  })
  return chatDataList
}
