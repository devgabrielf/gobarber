import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLogIn, FiMail } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/toast';
import { api } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Preencha o e-mail')
            .email('Digite um e-mail válido')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await api.post('/password/forgot', {
          email: data.email
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperaçao de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
            <h1>Recuperar senha</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}
