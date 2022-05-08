import { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Preencha o e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Preencha a senha')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
        });
      }
    },
    [signIn, history, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
            <h1>Faça seu login</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button type="submit">Entrar</Button>

            <Link to="forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}
