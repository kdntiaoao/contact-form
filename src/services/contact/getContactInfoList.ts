import { ContactInfoList } from 'types/data'

export const getContactInfoList = async (): Promise<ContactInfoList | null> => {
  const res = await fetch('/api/contact', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const contactInfoList = await res.json()
  return contactInfoList
}
