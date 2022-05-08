import { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/toast';
import { api } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { AnimationContainer, Background, Container, Content } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Preencha o nome'),
          email: Yup.string()
            .required('Preencha o e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber.'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.'
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" placeholder="Nome" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}
