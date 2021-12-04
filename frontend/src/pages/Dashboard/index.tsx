import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomersTable from '../../components/CustomersTable';

import Header from "../../components/Header";
import PermissionComponent from '../../components/PermissionComponent';

export default function Dashboard() {

  useEffect(() => {
    document.title = "Customer Manager | Dashboard"
  }, []);

  return (
    <>
      <Header />
      <div className="container py-3">
        <h1 className="text-center">Clientes cadastrados</h1>

        <div className="d-flex justify-content-end py-2">
          <PermissionComponent role="ADMIN">
            <Link to="/customer/create" className="btn btn-primary">
              Cadastrar cliente
            </Link>
          </PermissionComponent>
        </div>
        <CustomersTable />
      </div>
    </>
  );
}