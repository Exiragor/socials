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

export const MUTATION_CHANGE_USER_FIELD = gql`
    mutation ChangeUserField(
        $newValue: String!,
        $fieldName: String!,
    ) {
        changeUserField(
            newValue: $newValue,
            fieldName: $fieldName,
        )
    }
`;