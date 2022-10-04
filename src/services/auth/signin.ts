import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../../firebase/client'

export const signin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
}
