import {User, UsersState} from "~/types";
import { MutationTree, ActionTree } from "vuex";
import { getClient } from '~/helpers/store'
import {MUTATION_LOGIN, MUTATION_REGISTRATION, QUERY_GET_ME, MUTATION_CHANGE_USER_FIELD} from "~/gql";

export const state = (): UsersState => ({
    me: null
});

export const mutations: MutationTree<UsersState> = {
    setMe(state: UsersState, user: User): void {
        state.me = user
    },
    clearMe(state: UsersState) {
        state.me = null
    },
    changeField(state: UsersState, { fieldName, newValue }) {
        if (state.me != null)
            state.me[fieldName] = newValue
    }
};

export const actions: ActionTree<UsersState, UsersState> = {
    async registration({}, {username, email, password, birthdate}) {
        let client = getClient(this)
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
        let client = getClient(this)
        try {
            let res: any = await client.mutate({
                mutation: MUTATION_LOGIN,
                variables: {username, password}
            });
            if (res && res.data && res.data.login) {
                commit('setMe', res.data.login)
            }
            return res
        } catch (e) {
            console.error(e.message)
            return { error: e.message.split('GraphQL error: ')[1] }
        }
    },
    async getMe ({commit}) {
        let client = getClient(this)
        try {
            let res: any = await client.query({
                query: QUERY_GET_ME,
            });
            if (res && res.data && res.data.me) {
                commit('setMe', res.data.me)
            }
            return res
        } catch (e) {
            console.error(e.message)
            return { error: e.message.split('GraphQL error: ')[1] }
        }
    },
    logout ({commit}) {
        commit('clearMe')
    },
    async changeField({commit}, { fieldName, newValue }) {
        let client = getClient(this)
        try {
            let res: any = await client.mutate({
                mutation: MUTATION_CHANGE_USER_FIELD,
                variables: {fieldName, newValue}
            });
            if (res && res.data && res.data.changeUserField) {
                commit('changeField', { fieldName, newValue })
            }
            return res
        } catch (e) {
            console.error(e.message)
            return { error: e.message.split('GraphQL error: ')[1] }
        }
    }
};