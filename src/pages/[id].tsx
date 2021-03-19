import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { FormPost, StrapiPost } from '../components/FormPost';
import { Wrapper } from '../components/Wrapper';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_POST } from '../graphql/queries/post';
import { GQL_MUTATION_UPDATE_POST } from '../graphql/mutations/post';

export type PostPageProps = {
  post: StrapiPost;
};

export default function PostPage({ post }: PostPageProps) {
  const [session, loading] = useSession();

  if (!session && !loading) {
    return frontEndRedirect();
  }

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    return <p>Você não está autenticado</p>;
  }

  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
    } catch (e) {
      alert('Erro ao salvar o post');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { id } = ctx.params;

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const { post } = await gqlClient.request(
      GQL_QUERY_GET_POST,
      {
        id,
      },
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );

    return {
      props: {
        session,
        post,
      },
    };
  } catch (e) {
    return serverSideRedirect(ctx);
  }
};
