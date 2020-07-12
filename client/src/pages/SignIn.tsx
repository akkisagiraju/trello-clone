import React, { ChangeEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Container from '../styles/Container';
import Button from '../styles/Button';
import useAuth from '../hooks/useAuth';

const Card = styled(Container)`
  width: 320px;
  flex-direction: column;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 10px;
  padding: 25px 40px;
  font-family: inherit;
`;

const Form = styled(Container)`
  flex-direction: column;
  margin: 8px auto;
`;

const Input = styled.input`
  margin-bottom: 16px;
`;

const SignIn: React.FC<{ signup: () => void }> = ({ signup }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { saveUser } = useAuth();

  const signinHandler = async (): Promise<void> => {
    try {
      const response = await axios.post('/auth/signin', { email, password });
      saveUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Card>
        <h1>Login</h1>
        <Form>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button info bold onClick={signinHandler}>
            Sign in
          </Button>
        </Form>
        <Button outline bold onClick={() => signup()}>
          Sign up
        </Button>
      </Card>
    </Container>
  );
};

export default SignIn;
