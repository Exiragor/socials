<template>
    <section class="container">
        <div class="d-flex justify-content-center">
            <form>
                <div class="form-group">
                    <label for="username">Имя пользователя</label>
                    <input type="text" class="form-control" id="username">
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Войти</button>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';

    @Component({})
    export default class extends Vue {

    }
</script>
