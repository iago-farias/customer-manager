import {Link} from 'react-router-dom';
import CustomersTable from '../../components/CustomersTable';

import Header from "../../components/Header";

export default function Dashboard(){
  return(
    <>
      <Header />
      <div className="container py-3">
        <h1 className="text-center">Clientes cadastrados</h1>

        <div className="d-flex justify-content-end py-2">
            <Link to="/customer/create" className="btn btn-primary">
              Cadastrar cliente
            </Link>
         
        </div>
        <CustomersTable />
      </div>
    </>
  );
}