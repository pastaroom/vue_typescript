<template>
  <v-app>
    <v-main>
      <Layout-nomal v-if="isAuth"/>
      <Layout-auth v-else/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LayoutNormal from '@/components/Layout/normal.vue'
import LayoutAuth from '@/components/Layout/auth.vue'

@Component({
  components: {
    LayoutNormal,
    LayoutAuth
  }
})
export default class App extends Vue {
  isAuth = false
}
</script>
