import { gql } from 'graphql-request';
import { GQL_FRAGMENT_USER } from '../fragments/user';

export const GQL_MUTATION_AUTHENTICATE_USER = gql`
  ${GQL_FRAGMENT_USER}

  mutation AUTHENTICATE_USER($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        ...user
      }
    }
  }
`;
