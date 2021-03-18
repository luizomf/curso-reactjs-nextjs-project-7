import { gql } from 'graphql-request';

export const GQL_FRAGMENT_POST = gql`
  fragment post on Post {
    id
    title
    content
    user {
      id
      username
      email
    }
    createdAt
  }
`;
