import { Container } from './styles';

export interface TooltipProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function Tooltip({ title, className, children }: TooltipProps) {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  );
}
