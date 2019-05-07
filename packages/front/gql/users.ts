import gql from 'graphql-tag'

export const QUERY_GET_ME = gql`
    query me {
          me {
                id
                username
                accessToken
                status
                birthDate
                nickname
                avatar
                email
          }
    }
`;