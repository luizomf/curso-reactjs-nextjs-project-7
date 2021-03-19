import { useSession } from 'next-auth/client';
import React from 'react';
import { frontEndRedirect } from '../../utils/front-end-redirect';

export type PrivateComponentProps = {
  children: React.ReactNode;
};

export const PrivateComponent = ({ children }: PrivateComponentProps) => {
  const [session, loading] = useSession();

  if (!session && !loading) {
    return frontEndRedirect();
  }

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    return <p>Você não está autenticado</p>;
  }

  return children;
};
