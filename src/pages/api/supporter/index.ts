import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../../firebase/server'

import { Supporter, SupporterList } from 'types/data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // サポーター情報を登録
  if (req.method === 'POST') {
    const { uid, supporter } = req.body

    await adminDb.collection('supporterList').doc(uid).set(supporter)

    res.status(200).end()
  }

  // サポーターを取得
  if (req.method === 'GET') {
    const snapshot = await adminDb.collection('supporterList').get()

    if (snapshot.empty) {
      res.status(404).json({})
      return
    }

    const supporterList: SupporterList = {}
    snapshot.forEach((doc) => (supporterList[doc.id] = doc.data() as Supporter))

    res.status(200).json(supporterList)
  }
}

export default handler
