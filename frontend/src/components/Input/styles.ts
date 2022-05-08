import styled, { css } from 'styled-components';
import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background: #232129;
  color: #666360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;

  display: flex;
  align-items: center;

  transition: 0.2s;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    !props.isErrored &&
    css`
      color: #ff9000;
    `}

  > input {
    flex: 1;

    background: transparent;
    color: #f4ede8;

    border: 0;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      box-shadow: 0 0 0px 1000px #232129 inset;
      -webkit-text-fill-color: #f4ede8;
      transition: background-color 5000s ease-in-out 0s;
      caret-color: #f4ede8;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  > svg {
    margin: 0;
  }

  > span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
