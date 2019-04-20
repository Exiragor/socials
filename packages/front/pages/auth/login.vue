<template>
    <section class="container">
        <div class="d-flex justify-content-center">
            <div>
                <div class="form-group">
                    <label for="username">Имя пользователя</label>
                    <input type="text" v-model="username" class="form-control" id="username">
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" v-model="password" class="form-control" id="password">
                </div>
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

    @Component({})
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
            this.$router.push({ path: '/'});
        }
    }
</script>
