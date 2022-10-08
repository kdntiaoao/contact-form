import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDatabase } from '../../../firebase/server'

type Data = string

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // チャットデータを登録
  if (req.method === 'POST') {
    const { docId, chat } = req.body

    const ref = adminDatabase.ref(`chatDataList/${docId}`).push()
    await ref.set(chat)

    res.status(200).end()
  }

  // チャットデータを取得
  if (req.method === 'GET') {
    res.status(200).json('GET success!')
  }
}

export default handler
