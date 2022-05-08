import {
  Redirect,
  Route as ReactRoute,
  RouteProps as ReactRouteProps
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export function Route({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
}
