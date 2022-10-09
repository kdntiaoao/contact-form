import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../firebase/server'

type Data = string

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // お問い合わせ情報を登録
  if (req.method === 'POST') {
    const { contactInfo } = req.body

    const firestoreRes = await adminDb.collection('contactInfo').add(contactInfo)

    res.status(200).json(firestoreRes.id)
  }

  // お問い合わせ情報を取得
  if (req.method === 'GET') {
    res.status(200).json('GET success!')
  }
}

export default handler
