import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface AppProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
