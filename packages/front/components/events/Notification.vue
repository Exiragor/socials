<template>
    <notifications class="fixed mt80" />
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';

    @Component({})
    export default class extends Vue {

        // default
        $notify: any;
        $bus: any;

        created() {
            this.$bus.$on('notify', data => {
                const obj = {
                    text: 'default',
                    position: 'top right'
                }
                for (let key in data) {
                    obj[key] = data[key]
                }
                this.$notify(obj)
            })
        }
    }
</script>

<style scoped>
    .mt80 {
        margin-top: 80px;
    }
</style>