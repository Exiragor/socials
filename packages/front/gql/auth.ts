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