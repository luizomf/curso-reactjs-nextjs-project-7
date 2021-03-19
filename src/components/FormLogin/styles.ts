import styled, { css } from 'styled-components';

export const Wrapper = styled.form``;

export const ButtonWrapper = styled.div``;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    background: ${theme.colors.warning};
    color: ${theme.colors.white};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
  `}
`;
