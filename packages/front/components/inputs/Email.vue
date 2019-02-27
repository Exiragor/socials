<template>
    <base-input type="email" v-model="email" id="email">Email</base-input>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Watch,
        Prop
    } from 'nuxt-property-decorator';
    import BaseInput from '../form/BaseInput';
    import { required, email } from 'vuelidate/lib/validators'

    @Component({
        components: {
            BaseInput
        }
    })
    export default class EmailInput extends Vue {
        email: string = '';
        @Prop({ default: () => ''}) value: string;

        @Watch('value')
        onValueChanged() {
            this.email = this.value;
        }
        @Watch('email')
        onEmailChanged() {
            this.$emit('input', this.email);
        }
    }
</script>