<template>
    <section class="container">
        <div class="d-flex justify-content-center">
            <div>
                <base-input v-model="username" id="username">Имя пользователя</base-input>
                <base-input type="password" v-model="password" id="password">Пароль</base-input>
                <button type="submit" class="btn btn-primary" @click="login">Войти</button>
            </div>
        </div>
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
        @Action('users/login') loginAction;

        username: string = '';
        password: string = '';

        async login() {
            let res = await this.loginAction({
                username: this.username,
                password: this.password
            });
            if (res.error) {
                this.$bus.$emit('notify', {text: res.error, type: 'error'});
            }
            this.$apolloHelpers.onLogin(res.data.login.accessToken)
            this.$router.push({ path: '/'});
        }
    }
</script>
