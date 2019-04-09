<template>
    <ul class="nav p-2 mb-3">
        <li class="nav-item" v-for="link in links" :key="link.path">
            <router-link v-if="link.show" class="nav-link" :to="link.path">{{ link.text }}</router-link>
        </li>
        <li class="nav-item nav-item--right">
            <router-link class="nav-link" to="/auth/login">Войти</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/auth/registration">Регистрация</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import {Link} from "../../types";

    @Component({})
    export default class Nav extends Vue {
        links: Link[] = [
            {
                path: '/',
                text: 'Главная',
                show: true
            },
            {
                path: '/profile',
                text: 'Профиль',
                show: false
            }
        ];
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