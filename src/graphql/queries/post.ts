import { gql } from 'graphql-request';
import { GQL_FRAGMENT_POST } from '../fragments/post';

export const GQL_QUERY_GET_POSTS = gql`
  ${GQL_FRAGMENT_POST}

  query GET_POSTS {
    posts(sort: "id:desc") {
      ...post
    }
  }
`;

export const GQL_QUERY_GET_POST = gql`
  ${GQL_FRAGMENT_POST}

  query GET_POST($id: ID!) {
    post(id: $id) {
      ...post
    }
  }
`;
