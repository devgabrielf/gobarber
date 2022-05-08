import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: string;
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  background: ${props => {
    switch (props.type) {
      case 'info':
        return '#3172b7';
      case 'success':
        return '#3f8c49';
      case 'error':
        return '#c53030';
      default:
        return '#3172b7';
    }
  }};

  > svg {
    margin: 4px 12px 0 0;
  }

  > div {
    flex: 1;

    > p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  > button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    props.hasdescription === 'true' &&
    css`
      align-items: center;

      > svg {
        margin-top: 0;
      }
    `}
`;
