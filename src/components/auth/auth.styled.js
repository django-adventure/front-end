import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  /* border: 5px solid #566354; */
  border: 4px solid gray;
  border-radius: 2px;
  margin: 10% auto 0;
  padding: 2rem;
  font-family: 'VT323', monospace;

  background: #000;
  background-image: radial-gradient(rgba(105, 86, 9, 0.75), black 170%);
  text-shadow: 0 0 5px #c8c8c8;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: repeating-linear-gradient(
      0deg,
      rgba(black, 0.15),
      rgba(black, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  h1 {
    /* font-family:'VT323',monospace; */
    text-align: center;
    margin: 0 0 2rem;
    font-size: 32px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 1.75rem;
      /* font-size: 16px; */
      padding: 10px;
      border: 1px solid #ccc;
      outline: none;
      /* border-radius: 1px; */
      font-size: 22px;
      background: #ccc;
      font-family: inherit;

      &:focus {
        border: 1px solid #61dafb;
      }
    }

    button {
      margin-top: 0.5rem;
      font-size: 24px;
      margin-bottom: 1rem;
      padding: 10px;
      text-transform: uppercase;
      font-weight: bold;
      border: none;
      cursor: pointer;
      background-color: #ff9210;
      font-family: inherit;
      color: white;
    }

    .error {
      font-size: 12px;
      margin: 0;
      margin-top: -1rem;
      padding: 8px;
      margin-bottom: 1rem;
      background: #d64550;
      border-radius: 1px;
    }

    .error + .error {
      margin-top: -0.25rem;
    }

    button + .error {
      margin-top: 0;
    }
  }
`;

export default AuthWrapper;
