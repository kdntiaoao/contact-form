import { onAuthStateChanged } from 'firebase/auth'
import { atom } from 'recoil'

import { auth } from '../../firebase/client'

type UserInfo = {
  userId: string | undefined
}

export const userInfoState = atom<UserInfo | undefined>({
  key: 'userInfoState',
  default: undefined,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setSelf({ userId: user.uid })
        } else {
          setSelf({ userId: undefined })
        }
      })

      return () => {
        unsubscribe()
      }
    },
  ],
})
