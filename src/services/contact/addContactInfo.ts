import { ContactInfo } from 'types/data'

export const addContactInfo = async (contactInfo: ContactInfo): Promise<string> => {
  const firestoreRes = await fetch('/api/contactInfo', {
    body: JSON.stringify({ contactInfo }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  const docId = (await firestoreRes.json()) as string

  return docId
}
