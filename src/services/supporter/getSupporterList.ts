import { SupporterList } from 'types/data'

export const getSupporterList = async (): Promise<SupporterList | null> => {
  const res = await fetch('/api/supporter', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const supporterList = res.ok ? await res.json() : null
  return supporterList
}
