import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQRLy4gfFom9I-yxB2k3h2C9aJ3lN5poA',
  authDomain: 'contact-form-8add7.firebaseapp.com',
  projectId: 'contact-form-8add7',
  storageBucket: 'contact-form-8add7.appspot.com',
  messagingSenderId: '80571030615',
  appId: '1:80571030615:web:9540ee9de80eca5125d712',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore()
