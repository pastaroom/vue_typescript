import * as functions from 'firebase-functions'
import userCollection, { User } from './models/users'

const test = async () => {
  const ref = userCollection.doc('a')
  const user = new User('name OK')
  await ref.set(user)
  const doc = await ref.get()
  console.log(doc.data())
}

test()
console.log('functions start')

export const userCreated = functions.auth.user().onCreate(user => {
  console.log(user)
  const { uid, email, providerData, displayName, photoURL } = user
  const ref = userCollection.doc(uid)
  if (!email) throw Error(`${email} is empty`)

  return ref.set(new User(email, providerData.map(p => p.providerId), displayName, photoURL))
})

export const userDeleted = functions.auth.user().onDelete(user => {
  console.log(user)
  const ref = userCollection.doc(user.uid)
  return ref.delete()
})
