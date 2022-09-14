import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../firebase/client'

export const getContactData = async (id: string) => {
  const docRef = doc(db, 'contactData', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('contactData : ', docSnap.data())
  } else {
    console.log('No such document!')
  }
}

export const getContactInfo = async (id: string) => {
  const docRef = doc(db, 'contactData', id, 'contactInfo')
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    console.log('contactInfo : ', snapshot.data())
  } else {
    console.log('No such document!')
  }
}
