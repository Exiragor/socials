<template>
  <div>
    <nav-component />
    <nuxt/>
    <notification-event />
  </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "nuxt-property-decorator";
    import NavComponent from '../components/header/Nav'
    import NotificationEvent from '../components/events/Notification'

    @Component({
        components: {
            NavComponent,
            NotificationEvent
        }
    })
    export default class DefaultLayout extends Vue {}
</script>