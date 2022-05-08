import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({ children, loading = false, ...rest }: ButtonProps) {
  return (
    <Container type="button" disabled={loading} $loading={loading} {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
}

Button.defaultProps = {
  loading: false
};
