import gql from 'graphql-tag'

export const QUERY_CHAT_LSIT = gql`
    query ChatList($count: Float!, $page: Float!) {
        chatList(count: $count, page: $page) {
            data {
                id
                name
                picture
                description
            }
            totalCount
            currentPage
            totalPages
        }
    }
`;