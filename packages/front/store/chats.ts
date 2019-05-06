import {ChatsState, Chat} from "~/types";
import { MutationTree, ActionTree } from "vuex";
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import {QUERY_CHAT_LIST} from "~/gql";

export const state = (): ChatsState => ({
    list: [],
    lastPage: 0
});

export const mutations: MutationTree<ChatsState> = {
    setChats(state: ChatsState, chats: Chat[]): void {
        state.list = chats
    },
    setLastPage(state: ChatsState, lastPage: number): void {
        state.lastPage = lastPage
    }
};

export const actions: ActionTree<ChatsState, ChatsState> = {
    async loadChats({commit, state}, {count, page}) {
        let client: ApolloClient<NormalizedCacheObject> = (this as any).app.apolloProvider.defaultClient;
        let { data }  = await client.query({ query: QUERY_CHAT_LIST, variables: { count, page }}) as any;
        commit('setChats', data.chatList.data);
        commit('setLastPage', data.chatList.totalPages);
    }
};