<template>
    <div class="card">
        <img :src="chat.picture" :alt="chat.name" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ chat.name }}</h5>
            <p class="card-text">{{ chat.description }}</p>
            <a href="#" class="btn btn-primary">Join(todo)</a>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";
import {Chat} from "../../types";

@Component({})
export default class ChatCard extends Vue {
    @Prop() chat: Chat;

}
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    align-items: center;
    padding: 15px;
    & img {
        max-width: 100px;
        margin-right: 25px;
    }
}
</style>