import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import { Toast } from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export function ToastContainer({ messages }: ToastContainerProps) {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
    keys: message => message.id
  });

  return (
    <Container>
      {messagesWithTransitions((props, item) => (
        <Toast style={props} message={item} />
      ))}
    </Container>
  );
}
