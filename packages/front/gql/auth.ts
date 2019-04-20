import gql from 'graphql-tag'

export const MUTATION_REGISTRATION = gql`
    mutation Registration(
        $birthdate: DateTime!,
        $username: String!,
        $email: String!,
        $password: String!
    ) {
        registration(
            birthdate: $birthdate,
            username: $username,
            email: $email,
            password: $password
        )
    }
`;

export const MUTATION_LOGIN = gql`
    mutation Login(
        $username: String!,
        $password: String!
    ) {
        login(
            username: $username,
            password: $password
        ) {
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