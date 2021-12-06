import { useEffect, useState } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { api } from '../services/api';

interface RoutePropsData extends RouteProps {
  role?: string;
}

export default function PrivateRoute({ role, ...rest }: RoutePropsData) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const { token, logOut } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setIsloading(true);
        const response = await api.get("/user/roles");
        const userRoles = response.data as string[];
  
        const permission = userRoles.includes(role as string);
        
        setHasPermission(permission);
        setIsloading(false);
      } catch(err){
        logOut();
      }
    })();
  }, []);

  if (!token.jwtToken) {
    return (<Redirect to="/" />)
  }

  if (!role && token.jwtToken) {
    return (<Route {...rest} />)
  }

  if(isLoading){
    return null;
  }

  return hasPermission ? <Route {...rest} /> : <Redirect to="/" />;

}