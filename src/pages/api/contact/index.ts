import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../../firebase/server'

import { ContactInfo, ContactInfoList } from 'types/data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // お問い合わせ情報を登録
  if (req.method === 'POST') {
    const { contactInfo } = req.body

    const firestoreRes = await adminDb.collection('contactInfoList').add(contactInfo)

    res.status(200).json(firestoreRes.id)
  }

  // お問い合わせ情報リストを取得
  if (req.method === 'GET') {
    const snapshot = await adminDb.collection('contactInfoList').get()

    if (snapshot.empty) {
      res.status(404).end()
    }

    const contactInfoList: ContactInfoList = {}
    snapshot.forEach((doc) => {
      const contactInfo = doc.data() as ContactInfo
      contactInfoList[doc.id] = contactInfo
    })

    res.status(200).json(contactInfoList)
  }
}

export default handler
