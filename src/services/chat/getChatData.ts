import { child, get, ref } from 'firebase/database'

import { database } from '../../../firebase/client'

import { ChatData } from 'types/data'

export const getChatData = async (contactId: string): Promise<ChatData | null> => {
  const chatDataSnap =  await get(child(ref(database), `chatDataList/${contactId}`))

  // データ取得に成功した場合
  if (chatDataSnap.exists()) {
    const chatData = chatDataSnap.val() as ChatData
    return chatData
  } else {
    return null
  }
}
