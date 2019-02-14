import {Person, ChatsState, Chat} from "~/types";
import { MutationTree, ActionTree } from "vuex";
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import {QUERY_CHAT_LSIT} from "~/gql";

export const state = (): ChatsState => ({
    list: []
})

export const mutations: MutationTree<ChatsState> = {
    setChats(state: ChatsState, chats: Chat[]): void {
        state.list = chats
    }
}

export const actions: ActionTree<ChatsState, ChatsState> = {
    async loadChats({commit}, {count, page}) {
        let client: ApolloClient<NormalizedCacheObject> = (this as any).app.apolloProvider.defaultClient;
        let { data } = await client.query({ query: QUERY_CHAT_LSIT, variables: { count, page }});
        commit('setChats', data.chatList.data)
    }
}