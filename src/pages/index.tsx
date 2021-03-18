import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

export default function Index() {
  const [session, loading] = useSession();

  return (
    <h1>
      <span>Olá mundo </span>
      <pre>{session && JSON.stringify(session)}</pre>
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
