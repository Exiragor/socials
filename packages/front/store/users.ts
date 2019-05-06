import {User, UsersState} from "~/types";
import { MutationTree, ActionTree } from "vuex";
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import {MUTATION_LOGIN, MUTATION_REGISTRATION} from "~/gql";
import Vue from 'vue'

export const state = (): UsersState => ({
    me: null
});

export const mutations: MutationTree<UsersState> = {
    setMe(state: UsersState, user: User): void {
        state.me = user
    }
};

export const actions: ActionTree<UsersState, UsersState> = {
    async registration({}, {username, email, password, birthdate}) {
        let client: ApolloClient<NormalizedCacheObject> = (this as any).app.apolloProvider.defaultClient;
        try {
            return await client.mutate({
                mutation: MUTATION_REGISTRATION,
                variables: {username, email, password, birthdate}
            });
        } catch (e) {
            console.error(e.message)
            return { error: e.message.split('GraphQL error: ')[1] }
        }
    },
    async login({commit}, { username, password}) {
        let client: ApolloClient<NormalizedCacheObject> = (this as any).app.apolloProvider.defaultClient;
        try {
            let res: any = await client.mutate({
                mutation: MUTATION_LOGIN,
                variables: {username, password}
            });
            if (res && res.data && res.data.login) {
                commit('setMe', res.data.login)
                // Vue.$cookie.set('apollo-token', res.data.login.accessToken, 1);
            }
            return res
        } catch (e) {
            console.error(e.message)
            return { error: e.message.split('GraphQL error: ')[1] }
        }
    }
};