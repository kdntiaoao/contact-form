import { ContactInfo } from 'types/data'

export const updateContactInfo = async (contactId: string, newContactInfo: Partial<ContactInfo>): Promise<void> => {
  await fetch(`/api/contact/${contactId}`, {
    body: JSON.stringify({ newContactInfo }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}
