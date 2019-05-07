import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'

export const getClient = (context: any): ApolloClient<NormalizedCacheObject> => {
    return context.app.apolloProvider.defaultClient;
}