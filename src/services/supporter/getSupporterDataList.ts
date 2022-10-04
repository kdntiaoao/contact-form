import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../../firebase/client'

import { Supporter, SupporterData } from 'types/data'

export const getSupporterDataList = async (): Promise<SupporterData | null> => {
  const supporterDataListSnap =  await getDocs(collection(db, 'supporterData'))

  // データ取得に失敗した場合
  if (supporterDataListSnap.empty) {
    return null
  }

  // データ取得に成功した場合
  const supporterDataList: SupporterData = {}
  supporterDataListSnap.forEach((doc) => {
    const data = doc.data() as Supporter
    supporterDataList[doc.id] = data
  })
  return supporterDataList
}
