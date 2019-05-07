<template>
    <section class="container">
        <h2>Выходим из аккаунта</h2>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import { Action } from 'vuex-class'
    import BaseInput from '../../components/form/BaseInput';

    @Component({
        components: {
            BaseInput
        }
    })
    export default class extends Vue {
        @Action('users/logout') logoutAction;

        created() {
            this.logout()
        }

        logout() {
            this.logoutAction()
            this.$apolloHelpers.onLogout()
            this.$router.push({ path: '/'});
        }
    }
</script>
