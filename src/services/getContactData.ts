import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../firebase/client'

import { ContactInfo } from 'types/data'

export const getContactInfo = async (id: string): Promise<ContactInfo | undefined> => {
  const docRef = doc(db, 'contactInfo', id)
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    const contactInfo = snapshot.data() as ContactInfo
      console.log('contactInfo : ', contactInfo)
      return contactInfo
  } else {
    console.log('No such document!')
    return undefined
  }
}
