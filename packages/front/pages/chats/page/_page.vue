<template>
    <div class="chats">
        <h1>Chats:</h1>
        <chat-list :chats="chats" />
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop
} from "nuxt-property-decorator";
import { Action, State } from 'vuex-class'
import { Route } from "vue-router"
import ChatList from '~/components/chats/List'

@Component({
    components: {
        ChatList
    }
})
export default class ChatsListPage extends Vue {
    @State(state => state.chats.list) chats;
    @Action('chats/loadChats') loadChatsAction;

    count: number = 5;
    $route: Route;

    created() {
        this.loadChats();
    }

    loadChats(): void {
        let page = +this.$route.params['page'];
        this.loadChatsAction({ count: this.count, page});
    }
}
</script>