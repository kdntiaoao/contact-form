import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDatabase } from '../../../../firebase/server'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // チャットデータを登録
  if (req.method === 'POST') {
    const { chatId, chat } = req.body

    const ref = adminDatabase.ref(`chatDataList/${chatId}`).push()
    await ref.set(chat)

    res.status(200).end()
  }
}

export default handler
