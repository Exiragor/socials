<template>
    <div class="row">
        <div class="col-md-6 mb-md-5" v-for="chat in chats" :key="chat.id">
            <chat-card :chat="chat"/>
        </div>
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