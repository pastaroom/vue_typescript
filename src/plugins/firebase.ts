import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig)

firebase.auth().useDeviceLanguage()

export const auth = firebase.auth()
export const db = firebase.firestore()
export const rdb = firebase.database()

if (location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099/')
  firebase.firestore().useEmulator('localhost', 5002)
  firebase.database().useEmulator('localhost', 9000)
}

Vue.prototype.$firebase = firebase

export default firebase
