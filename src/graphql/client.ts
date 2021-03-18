import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
);
