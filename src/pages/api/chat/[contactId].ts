import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDatabase } from '../../../../firebase/server'

import { ChatData } from 'types/data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contactId } = req.query

  // チャットデータを登録
  if (req.method === 'POST') {
    const { chat } = req.body

    const ref = adminDatabase.ref(`chatDataList/${contactId}`).push()
    await ref.set(chat)

    res.status(200).json({chatId: ref.key})
  }

  // チャットデータを取得
  if (req.method === 'GET') {
    const ref = adminDatabase.ref(`chatDataList/${contactId}`)
    const chatDataSnap = await ref.orderByChild('postTime').once('value')
    const chatData: ChatData = [] // チャットデータ
    chatDataSnap.forEach((snap) => {
      chatData.push(snap.val())
    })

    res.status(200).json(chatData)
  }
}

export default handler
