import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../../firebase/server'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contactId } = req.query

  if (!contactId || typeof contactId !== 'string') {
    res.status(404).end()
    return
  }

  // お問い合わせ情報を更新
  if (req.method === 'POST') {
    const contactInfoRef = adminDb.collection('contactInfoList').doc(contactId.toString())
    await contactInfoRef.update(req.body.newContactInfo)

    res.status(200).end()
  }

  // お問い合わせ情報を取得
  if (req.method === 'GET') {
    const contactInfoRef = adminDb.collection('contactInfoList').doc(contactId)
    const doc = await contactInfoRef.get()
    const contactInfo = doc.data()

    res.status(200).json(contactInfo)
  }
}

export default handler
