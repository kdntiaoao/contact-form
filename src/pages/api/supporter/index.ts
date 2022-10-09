import type { NextApiRequest, NextApiResponse } from 'next'

import { adminDb } from '../../../../firebase/server'

import { Supporter, SupporterData } from 'types/data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // サポーター情報を登録
  if (req.method === 'POST') {
    res.status(200).json('register success!')
  }

  // サポーターを取得
  if (req.method === 'GET') {
    const supporterDataRef = adminDb.collection('supporterData')
    const snapshot = await supporterDataRef.get()

    if (snapshot.empty) {
      res.status(404).end()
    }

    const supporterDataList: SupporterData = {}
    snapshot.forEach((doc) => {
      const supporter = doc.data() as Supporter
      supporterDataList[doc.id] = supporter
    })

    res.status(200).json(supporterDataList)
  }
}

export default handler
