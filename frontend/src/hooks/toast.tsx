import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import uuid from 'uuidv4';
import { ToastContainer } from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

interface ToastProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description
      };

      setMessages(state => [...state, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  const toastProviderValue = useMemo(() => {
    return {
      addToast,
      removeToast
    };
  }, [addToast, removeToast]);

  return (
    <ToastContext.Provider value={toastProviderValue}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
