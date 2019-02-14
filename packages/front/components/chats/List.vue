<template>
    <div>
        <chat-card v-for="chat in chats" :chat="chat" :key="chat.id" />
    </div>
</template>

<script lang="ts">
import ChatCard from './Card'

import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";
import {Chat} from "../../types";

@Component({
    components: {
        ChatCard
    }
})
export default class ChatList extends Vue {
    @Prop() chats: Chat[];
}
</script>