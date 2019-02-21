import {User, UsersState} from "~/types";
import { MutationTree, ActionTree } from "vuex";
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import {MUTATION_REGISTRATION} from "~/gql";

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
         return await client.mutate({
            mutation: MUTATION_REGISTRATION,
            variables: { username, email, password, birthdate }
        });
    }
};