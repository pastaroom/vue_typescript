import firebase, { db } from '@/plugins/firebase'

export class User {
  constructor (
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

export const converter: firebase.firestore.FirestoreDataConverter<User> = {
  toFirestore: (model: User, setOptions?: firebase.firestore.SetOptions) => {
    if (setOptions?.merge) {
      // console.log(model)
      // const m = Object.assign(model, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      // console.log(m)
      // return model
      // 아래 한 줄로 요약
      return Object.assign(model, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
    }
    return {
      name: model.name + ' a',
      createdAt: model.createdAt || firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: model.updatedAt || firebase.firestore.FieldValue.serverTimestamp()
    }
  },
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return new User(
      data.name + ' b',
      data.createdAt.toDate(),
      data.updatedAt.toDate()
    )
  }
}

export default db.collection('users').withConverter(converter)
