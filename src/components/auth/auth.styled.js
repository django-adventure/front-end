import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  border: 1px solid white;
  border-radius: 4px;
  margin: 10% auto 0;
  padding: 2rem;

  h1 {
    text-align: center;
    margin: 0 0 20px;
    font-size: 28px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 1.75rem;
      font-size: 16px;
      padding: 8px;
      border: 1px solid #ccc;
      outline: none;

      &:focus {
        border: 1px solid #61dafb;
      }
    }

    button {
      margin-top: 0.5rem;
      font-size: 16px;
      margin-bottom: 1rem;
      padding: 8px;
      text-transform: uppercase;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }
  }
`;

export default AuthWrapper;
