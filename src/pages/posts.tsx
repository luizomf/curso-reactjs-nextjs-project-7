import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Wrapper } from '../components/Wrapper';
import { gqlClient } from '../graphql/client';
import { GQL_MUTATION_DELETE_POST } from '../graphql/mutations/post';
import { GQL_QUERY_GET_POSTS } from '../graphql/queries/post';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function PostsPage({ posts = [] }: PostsPageProps) {
  const [session, loading] = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

  if (!session && !loading) {
    return frontEndRedirect();
  }

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    return <p>Você não está autenticado</p>;
  }

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setStatePosts((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível excluir este post');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>

      {statePosts.map((p) => (
        <p key={'post-' + p.id}>
          <Link href={`/${p.id}`}>
            <a>{p.title}</a>
          </Link>{' '}
          |{' '}
          <button onClick={() => handleDelete(p.id)} disabled={deleting}>
            Excluir
          </button>
        </p>
      ))}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const { posts } = await gqlClient.request(GQL_QUERY_GET_POSTS, null, {
      Authorization: `Bearer ${session.accessToken}`,
    });

    return {
      props: {
        session,
        posts,
      },
    };
  } catch (e) {
    return serverSideRedirect(ctx);
  }
};
