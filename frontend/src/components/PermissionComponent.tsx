import {useState, useEffect} from 'react';
import { api } from '../services/api';

interface PermissionComponentProps {
  role: string;
  children: JSX.Element
}

export default function PermissionComponent({role, children} : PermissionComponentProps){
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get("/user/roles");
      const userRoles = response.data as string[];

      const permission = userRoles.includes(role as string);
      
      setHasPermission(permission);
    })();
  }, []);

  return(
    <>
    {
     hasPermission && children
    }
    </>
  )
}