import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../../firebase/client'

export const signin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('success signin : ', user)
    })
    .catch((error) => {
      console.error(error.message)
    })
}
