<template>
    <v-form>
        <v-card>
            <v-card-title>
                email login
            </v-card-title>
            <v-card-text>
                <v-text-field
                  v-model="email"
                  type="email"
                  label="email"/>
            </v-card-text>
            <v-card-actions>
                <v-btn type="submit">submit</v-btn>
            </v-card-actions>
            <v-card-actions>
                <v-btn @click="signOut">signOut</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { auth } from '@/plugins/firebase'

    @Component<AuthSign>({
      created () {
        this.signIn()
      }
    })
export default class AuthSign extends Vue {
    email = ''

    submit () {
      const actionCodeSettings = {
        url: 'http://localhost:8080/finishSignUp',
        handleCodeInApp: true
      }
      auth.sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          localStorage.setItem('emailForSign', this.email)
        })
    }

    signIn () {
      const email = localStorage.getItem('emailForSignIn')
      if (!email) return
      this.email = email
      if (!auth.isSignInWithEmailLink(location.href)) return
      auth.signInWithEmailLink(this.email, location.href)
        .then(() => {
          localStorage.removeItem('emailForSign')
        })
    }

    signOut () {
      auth.signOut()
    }
}
</script>

<style scoped>

</style>
