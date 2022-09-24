import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../../firebase/client'

import { SupporterData } from 'types/data'

export const getSupporterDataList = async (): Promise<Record<string, SupporterData> | null> => {
  const supporterDataListSnap =  await getDocs(collection(db, 'supporterData'))

  // データ取得に失敗した場合
  if (supporterDataListSnap.empty) {
    console.log('supporterDataListSnap is empty.')
    return null
  }

  // データ取得に成功した場合
  const supporterDataList: Record<string, SupporterData> = {}
  supporterDataListSnap.forEach((doc) => {
    const data = doc.data() as SupporterData
    supporterDataList[doc.id] = data
  })
  return supporterDataList
}
