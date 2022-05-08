import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    > div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      display: flex;
      align-items: center;

      img {
        height: 80px;
        margin-right: 40px;
      }

      svg {
        height: 24px;
        width: 24px;
        color: #999591;

        &:hover {
          color: #f4ede8;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -93px auto 40px;

  width: 100%;

  > form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    > h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    > div:nth-of-type(4) {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  > svg {
    height: 186px;
    width: 186px;
    padding: 60px;
    border-radius: 50%;
    background-color: #232129;
    color: #999591;
  }

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    height: 48px;
    width: 48px;
    background: #ff9000;
    border: 0;
    border-radius: 50%;
    cursor: pointer;

    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
