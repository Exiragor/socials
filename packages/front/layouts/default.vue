<template>
  <div>
    <nav-component />
    <nuxt/>
  </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "nuxt-property-decorator";
    import NavComponent from '../components/header/Nav'

    @Component({
        components: {
            NavComponent
        }
    })
    export default class DefaultLayout extends Vue {}
</script>