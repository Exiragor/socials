<template>
    <section class="container">
        <h1 class="text-center">Регистрация:</h1>
        <div>
            <email-input v-model="email" />
            <base-input v-model="username" id="username">Имя пользователя</base-input>
            <base-input type="password" v-model="password" id="password">Пароль</base-input>
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
    import BaseInput from '../../components/form/BaseInput';
    import EmailInput from '../../components/inputs/Email';

    @Component({
        components: {
            DatePicker,
            BaseInput,
            EmailInput
        }
    })
    export default class extends Vue {
        @Action('users/registration') registrationAction;

        birthDate: string = '';
        username: string = '';
        email: string = '';
        password: string = '';

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
