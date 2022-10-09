import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../../firebase/server'

import { ContactInfo } from 'types/data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // お問い合わせ情報を登録
  if (req.method === 'POST') {
    const { contactInfo } = req.body

    const firestoreRes = await adminDb.collection('contactInfo').add(contactInfo)

    res.status(200).json(firestoreRes.id)
  }

  // お問い合わせ情報リストを取得
  if (req.method === 'GET') {
    const contactInfoRef = adminDb.collection('contactInfo')
    const snapshot = await contactInfoRef.get()

    if (snapshot.empty) {
      res.status(404).end()
    }

    const contactInfoList: Record<string, ContactInfo> = {}
    snapshot.forEach((doc) => {
      const contactInfo = doc.data() as ContactInfo
      contactInfoList[doc.id] = contactInfo
    })

    res.status(200).json(contactInfoList)
  }
}

export default handler