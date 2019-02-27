<template>
    <div class="form-group">
        <label :for="id"><slot></slot></label>
        <input
            :type="type"
            class="form-control"
            :id="id"
            @input="$emit('input', $event.target.value)"
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
    export default class extends Vue {
        @Prop({ default: () => ''}) value: string | number;
        @Prop({ default: () => ''}) placeholder: string | number;
        @Prop({ default: () => 'text'}) type: string = 'text';
        @Prop({ required: true }) id: string | number
    }
</script>