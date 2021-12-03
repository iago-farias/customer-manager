import { FaPen, FaTrash } from 'react-icons/fa';

export default function CustomersTable() {
  return (
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
        <tr>
          <td>Nome cliente</td>
          <td>99.999.999-99</td>
          <td>(99) 9999-9999</td>
          <td>contato@email.com</td>
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
        <tr>
          <td>Nome cliente</td>
          <td>99.999.999-99</td>
          <td>(99) 9999-9999</td>
          <td>contato@email.com</td>
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
        <tr>
          <td>Nome cliente</td>
          <td>99.999.999-99</td>
          <td>(99) 9999-9999</td>
          <td>contato@email.com</td>
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
      </tbody>
    </table>
  );
}