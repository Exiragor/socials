<template>
  <section class="container text-center">
    <h1 class="header">Social chats</h1>
    <p>Just login for use chats, or if u haven't account registration</p>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State, Action } from "vuex-class"
import { Person } from "~/types";
import Card from "~/components/Card.vue"

@Component({
  components: {
    Card
  }
})
export default class extends Vue {}
</script>