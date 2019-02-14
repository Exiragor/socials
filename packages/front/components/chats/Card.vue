<template>
    <div class="chat">
        <img :src="chat.picture" :alt="chat.name"/>
        <div class="name">{{ chat.name }}</div>
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

<style scoped>
.chat {
    display: flex;
    align-items: center;
    padding: 15px;
}
.chat img {
  max-width: 100px;
  margin-right: 25px;
}
</style>