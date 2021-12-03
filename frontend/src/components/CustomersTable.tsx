import { useState, useEffect } from 'react';

import { FaPen, FaTrash } from 'react-icons/fa';
import { api } from '../services/api';
import { Customer, CustomerPage } from '../types/Customer';
import { cpfMask, phoneMask } from '../util/masks';
import Pagination from './Pagination';

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);

  useEffect(() => {
    getCustomers();
  }, [activePage]);

  async function getCustomers() {
    const response = await api.get(`/customers?page=${activePage}&size=20`);

    const page = response.data as CustomerPage;

    setCustomers(page.content);
    setFirst(page.first);
    setLast(page.last);
  }

  function handleNextPage() {
    setActivePage(old => old - 1);
  }

  function handlePreviousPage() {
    setActivePage(old => old + 1);
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th scope="col">Telefone</th>
            <th scope="col">Email</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{cpfMask(customer.cpf)}</td>
                <td>{phoneMask(customer.phones[0])}</td>
                <td>{customer.emails[0].emailAddress}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-3 editButton"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar"
                  >
                    <FaPen color="#fff" />
                  </button>


                  <button
                    className="btn btn-danger btn-sm"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination
        pageNumber={activePage}
        first={first}
        last={last}
        handleNextPage={() => handleNextPage()}
        handlePreviousPage={() => handlePreviousPage()}
      />
    </>
  );
}