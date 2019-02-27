<template>
    <section class="container">
        <h1 class="text-center">Регистрация:</h1>
        <div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="form-group">
                <label>Дата рождения</label>
                <date-picker v-model="birthDate" />
            </div>
            <button class="btn btn-primary" @click="registration">Зарегистрироваться</button>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import { Action } from 'vuex-class'
    import DatePicker from 'vuejs-datepicker';

    @Component({
        components: {
            DatePicker
        }
    })
    export default class extends Vue {
        @Action('users/registration') registrationAction;

        birthDate: string = '';
        username: string = '';
        email: string = '';
        password: string = '';

        // default
        $bus: Vue;

        async registration() {
            let res = await this.registrationAction({
                birthdate: this.birthDate,
                username: this.username,
                email: this.email,
                password: this.password
            });
            if (res.data && res.data.registration) {
                this.$bus.$emit('notify', {text: "Registration is done", type: 'success'});
            }
            if (res.error) {
                this.$bus.$emit('notify', {text: res.error, type: 'error'});
            }
        }
    }
</script>
