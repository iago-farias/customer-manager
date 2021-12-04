import { useState, useEffect } from 'react';

import { FaPen, FaTrash, FaEye } from 'react-icons/fa';
import { api } from '../services/api';
import { Customer, CustomerPage } from '../types/Customer';
import { cpfMask, phoneMask } from '../util/masks';
import Modal from './Modal';
import Pagination from './Pagination';
import PermissionComponent from './PermissionComponent';

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  useEffect(() => {
    (async () => {
      const response = await api.get(`/customers?page=${activePage}&size=20`);

      const page = response.data as CustomerPage;

      setCustomers(page.content);
      setFirst(page.first);
      setLast(page.last);
    })();
  }, [activePage]);

  function handleNextPage() {
    setActivePage(old => old - 1);
  }

  function handlePreviousPage() {
    setActivePage(old => old + 1);
  }

  async function removeCustomer(customerId: number) {
    try {
      await api.delete(`/customers/${customerId}`);

      setCustomers(old => old.filter(customer => {
        if (customer.id !== customerId) {
          return customer;
        }
      }))

    } catch (err) {
      console.log(err);

    }
  }


  function handleShowModal(customer : Customer) {
    setSelectedCustomer(customer);
  }

  return (
    <>
    {
      selectedCustomer && (
        <Modal customer={selectedCustomer} />
      )
    }
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
                    type="button" 
                    className="btn btn-primary btn-sm me-3"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    onClick={() => handleShowModal(customer)}
                  >
                    <FaEye />
                  </button>

                  <PermissionComponent role="ADMIN">
                    <button
                      className="btn btn-warning btn-sm me-3 editButton"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Editar"
                    >
                      <FaPen color="#fff" />
                    </button>
                  </PermissionComponent>

                  <PermissionComponent role="ADMIN">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCustomer(customer.id)}
                    >
                      <FaTrash />
                    </button>
                  </PermissionComponent>

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