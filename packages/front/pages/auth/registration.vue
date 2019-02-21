<template>
    <section class="container">
        <h1 class="text-center">Регистрация:</h1>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input type="text" class="form-control" id="username">
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" class="form-control" id="password">
            </div>
            <div class="form-group">
                <label>Дата рождения</label>
                <date-picker />
            </div>
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </form>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import DatePicker from 'vuejs-datepicker';

    @Component({
        components: {
            DatePicker
        }
    })
    export default class extends Vue {

    }
</script>
