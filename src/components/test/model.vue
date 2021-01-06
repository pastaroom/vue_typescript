<template>
    <v-card>
        <v-card-text>
            <v-text-field v-model="name"/>
            <v-textarea v-model="text" auto-grow/>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="read">read</v-btn>
            <v-btn @click="read">read</v-btn>
            <v-btn @click="write">write</v-btn>
            <v-btn @click="update">update</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import userCollection, { User } from '@/models/users'

    @Component
export default class ModelTest extends Vue {
    text = ''
    name = ''

    async read () {
      const doc = await userCollection.doc('aaa').get()
      this.text = JSON.stringify(doc.data(), null, 2)
    }

    async write () {
    //   const user = {
    //     name: this.name, createdAt: new Date(), updatedAt: new Date()
    //   }
    //   const user = new User(this.name, new Date(), new Date())
    // model-users.ts 바꾸며 아래 한 줄로 바뀜
      const user = new User(this.name)
      //   await db.collection('users').withConverter(converter).doc('aaa').set(user)
      await userCollection.doc('aaa').set(user)
      await this.read()
    }

    async update () {
      const user = {
        name: this.name, updatedAt: new Date()
      }
      //   await db.collection('users').withConverter(converter).doc('aaa').update(user)
      await userCollection.doc('aaa').set(user, { merge: true })
      await this.read()
    } // no converter in update
}
</script>

<style scoped>

</style>
