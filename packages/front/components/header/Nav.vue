<template>
    <ul class="nav p-2 mb-3">
        <li class="nav-item">
            <a class="nav-link" href="#">Главная</a>
        </li>
    </ul>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';

    @Component({})
    export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #563d7c;
        & .nav-link {
            color: #cbbde2;
            &.active {
                font-weight: 500;
                color: white;
            }
            &:hover {
                color: white;
            }
        }
    }
</style>