import * as Styled from './styles';

export type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
}
