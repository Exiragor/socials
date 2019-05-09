<template>
    <div class="form-group">
        <label :for="id"><slot></slot></label>
        <input
            :type="type"
            class="form-control"
            :id="id"
            @input="$emit('input', $event.target.value)"
            :placeholder="placeholder"
        >
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from 'nuxt-property-decorator';

    @Component({})
    export default class BaseInput extends Vue {
        @Prop({ default: () => ''}) value: string | number;
        @Prop({ default: () => ''}) placeholder: string | number;
        @Prop({ default: () => 'text'}) type: string;
        @Prop({ required: true }) id: string | number
    }
</script>