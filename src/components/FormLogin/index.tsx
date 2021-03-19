import React, { useEffect, useState } from 'react';
import { Email } from '@styled-icons/material-outlined/Email';
import { Password } from '@styled-icons/material-outlined/Password';

import { TextInput } from '../TextInput';
import * as Styled from './styles';
import { Button } from '../Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    console.log('Enviado', new Date().toLocaleString('pt-br'));

    setLoading(true);
    event.preventDefault();

    await new Promise((r) => setTimeout(r, 5000));

    if (onLogin) {
      await onLogin(email, password);
    }

    console.log('TERMINOU', new Date().toLocaleString('pt-br'));

    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        name="user-identifier"
        label="Seu e-mail"
        onInputChange={(v) => setEmail(v)}
        value={email}
        icon={<Email />}
        type="email"
      />
      <TextInput
        name="user-password"
        label="Sua senha"
        onInputChange={(v) => setPassword(v)}
        value={password}
        icon={<Password />}
        type="password"
      />

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? 'Aguarde...' : 'Entrar'}</Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
