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
    import { Action } from 'vuex-class'

    @Component({
        components: {
            NavComponent,
            NotificationEvent
        }
    })
    export default class DefaultLayout extends Vue {
        @Action('users/getMe') getMeAction;

        async created() {
            if (this.$apolloHelpers.getToken()) {
                await this.getMeAction()
            }
        }
    }
</script>