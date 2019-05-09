<template>
  <section class="container text-center">
    <h1 class="header">Social chats</h1>
    <p v-if="user">Hello, {{ user.nickname || user.username }}</p>
    <p v-else>Just login for use chats, or if u haven't account registration</p>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import {User} from "../types";

@Component({})
export default class extends Vue {
    @State(state => state.users.me) user: User
}
</script>