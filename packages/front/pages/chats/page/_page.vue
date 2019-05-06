<template>
    <div class="chats container">
        <h1 class="mb-md-3">Chats:</h1>
        <chat-list :chats="chats" />
        <pagination :last-page="lastPage" :current-page="currentPage" v-model="page" />
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop,
    Watch
} from "nuxt-property-decorator";
import { Action, State } from 'vuex-class'
import ChatList from '~/components/chats/List'
import Pagination from "../../../components/catalog/Pagination";

@Component({
    components: {
        Pagination,
        ChatList
    }
})
export default class ChatsListPage extends Vue {
    @State(state => state.chats.list) chats;
    @State(state => state.chats.lastPage) lastPage;
    @Action('chats/loadChats') loadChatsAction;

    count: number = 4;
    page: number = 0;

    mounted() {
        this.loadChats();
    }

    get currentPage(): number {
        return +this.$route.params['page'];
    }

    loadChats(): void {
        this.loadChatsAction({ count: this.count, page: this.currentPage });
    }

    @Watch('page')
    onChildChanged() {
        if (this.page > 0 && this.page <= this.lastPage)
            this.$router.push({name: 'chats-page-page', params: { page: this.page.toString() }})
    }
}
</script>