import { ContactInfo } from 'types/data'

export const getContactInfo = async (contactId: string): Promise<ContactInfo> => {
  const res = await fetch(`/api/contact/${contactId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  const contactInfo = await res.json()
  return contactInfo
}
