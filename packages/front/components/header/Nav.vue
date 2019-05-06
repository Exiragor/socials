<template>
    <ul class="nav p-2 mb-3">
        <li class="nav-item">
            <router-link class="nav-link" to="/">Главная</router-link>
        </li>
        <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/chats/page/1">Чаты</router-link>
        </li>
        <li class="nav-item nav-item--right" v-if="user">
            <router-link class="nav-link" to="/auth/logout">Выйти</router-link>
        </li>
        <template v-else>
            <li class="nav-item nav-item--right">
                <router-link class="nav-link" to="/auth/login">Войти</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/auth/registration">Регистрация</router-link>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import {Link} from "../../types";
    import { State } from "vuex-class"

    @Component({})
    export default class Nav extends Vue {
        @State(state => state.users.me) user
    }
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #563d7c;
        & .nav-item--right {
            margin-left: auto;
        }
        & .nav-link {
            color: #cbbde2;
            &.nuxt-link-exact-active {
                font-weight: 500;
                color: white;
            }
            &:hover {
                color: white;
            }
        }
    }
</style>