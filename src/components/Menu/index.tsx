import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Styled from './styles';

export type MenuProps = {
  title?: string;
};

export const Menu = () => {
  const [session] = useSession();
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setRedirect(encodeURI(window.location.pathname));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut({ redirect: true });
  };

  return (
    <Styled.Wrapper>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/create-post">
        <a>Create Post</a>
      </Link>
      <Link href="/open-route">
        <a>Open route</a>
      </Link>

      {session ? (
        <a href="#" onClick={handleClick}>
          Sair
        </a>
      ) : (
        <Link
          href={{
            pathname: '/login',
            query: {
              redirect,
            },
          }}
        >
          <a>Login</a>
        </Link>
      )}
    </Styled.Wrapper>
  );
};
