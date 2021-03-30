import { signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Button } from '../components/Button';
import { FormLogin } from '../components/FormLogin';
import { Wrapper } from '../components/Wrapper';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    const redirect = router.query?.redirect || '/';

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: redirect as string,
    });

    if (!response.ok) {
      setError('Usuário ou senha inválidos');
      return;
    }

    window.location.href = response.url;
  };

  const handleLoginGoogle = async () => {
    const redirect = router.query?.redirect || '/';
    await signIn('google', { callbackUrl: redirect as string });
  };
  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
      <br />
      <Button onClick={handleLoginGoogle}>Login com Google</Button>
    </Wrapper>
  );
}
