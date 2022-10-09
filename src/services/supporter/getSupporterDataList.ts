import { SupporterData } from 'types/data'

export const getSupporterDataList = async (): Promise<SupporterData | null> => {
  const res = await fetch('/api/supporter', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const supporterDataList = await res.json()
  return supporterDataList
}
