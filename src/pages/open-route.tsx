import { useSession } from 'next-auth/client';
import { Wrapper } from '../components/Wrapper';

export default function OpenRoutePage() {
  const [session] = useSession();

  return (
    <Wrapper>
      <h1>Essa rota é aberta</h1>

      {session?.user?.name ? (
        <p>Olá {session.user.name}.</p>
      ) : (
        <p>Olá, você ainda não fez login.</p>
      )}
    </Wrapper>
  );
}
