import { db } from '../plugins/firebase'
import firestore from '@google-cloud/firestore'
import crypto from 'crypto'

export class User {
  constructor (
    readonly email: string,
    readonly providerData?: string[],
    readonly displayName?: string,
    readonly photoURL?: string,
    readonly actions?: string[],
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) { }
}

export const converter: firestore.FirestoreDataConverter<User> = {
  toFirestore: (model: User, setOptions?: firestore.SetOptions) => {
    if (setOptions?.merge) {
      // console.log(model)
      // const m = Object.assign(model, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      // console.log(m)
      // return model
      // 아래 한 줄로 요약
      return Object.assign(model, { updatedAt: firestore.FieldValue.serverTimestamp() })
    }
    const hash = crypto.createHash('md5').update(model.email).digest('hex')
    return {
      email: model.email,
      providerId: model.providerData || [],
      displayName: model.displayName || '',
      photoURL: model.photoURL || `http://www.gravatar.com/avatar/${hash}.jpg`,
      actions: model.actions || [],
      createdAt: model.createdAt || firestore.FieldValue.serverTimestamp(),
      updatedAt: model.updatedAt || firestore.FieldValue.serverTimestamp()
    }
  },
  fromFirestore: (snapshot: firestore.QueryDocumentSnapshot) => {
    const data = snapshot.data()

    let photoURL = data.photoURL || ''
    if (photoURL.include('gravatar')) photoURL += '?d=identicon'
    return new User(
      data.email,
      data.providerData,
      data.displayName,
      photoURL,
      data.actions,
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    )
  }
}

export default db.collection('users').withConverter(converter)
