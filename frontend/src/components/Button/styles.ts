import { shade } from 'polished';
import styled from 'styled-components';

interface ButtonProps {
  $loading: boolean;
}

export const Container = styled.button<ButtonProps>`
  height: 59px;
  width: 100%;

  background: ${props => (props.$loading ? shade(0.4, '#ff9000') : '#ff9000')};
  color: #312e38;
  font-weight: 500;
  cursor: ${props => (props.$loading ? 'wait' : 'pointer')};

  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background: ${props =>
      props.$loading ? shade(0.4, '#ff9000') : shade(0.2, '#ff9000')};
  }

  &:active {
    background: ${shade(0.4, '#ff9000')};
  }
`;
