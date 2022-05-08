import { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLock } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/toast';
import { api } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

export function ResetPassword() {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta'
          )
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const { password, password_confirmation } = data;
        const token = location.search.split('=')[1];

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar sua senha, cheque as credenciais.'
        });
      }
    },
    [history, location.search, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />

            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmar senha"
              icon={FiLock}
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}
