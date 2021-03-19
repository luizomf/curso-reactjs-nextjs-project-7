import styled, { css } from 'styled-components';

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row wrap;
    margin-bottom: ${theme.spacings.xlarge};

    a {
      margin-right: ${theme.spacings.small};
      text-decoration: none;
      display: block;
      padding: ${theme.spacings.xsmall} 0;
    }
  `}
`;
