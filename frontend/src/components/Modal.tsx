import {Link} from 'react-router-dom';

import { Customer } from "../types/Customer";
import { cpfMask, phoneMask } from "../util/masks";
import PermissionComponent from "./PermissionComponent";

interface ModalProps {
  customer: Customer;
}

export default function Modal({ customer }: ModalProps) {

  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Dados do cliente</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="vstack gap-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputName"
                  value={customer.name}
                  placeholder="Nome completo"
                  disabled
                />
                <label htmlFor="floatingInputName">Nome completo</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputName"
                  value={cpfMask(customer.cpf)}
                  placeholder="CPF"
                  disabled
                />
                <label htmlFor="floatingPassword">CPF</label>
              </div>
            </div>

            <h2 className="mt-4">Contato</h2>
            <hr />
            <div className="vstack gap-3">
              {
                customer.phones.map((phone, index) => (
                  <div className="d-flex flex-row" key={index}>
                    <div
                      className="form-floating"
                      key={index}
                    >
                      <input
                        type="tel"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Telefone"
                        value={phoneMask(phone)}
                        disabled
                      />
                      <label htmlFor="floatingPassword">Telefone {index + 1} </label>
                    </div>

                    <select
                      className="form-select w-50"
                      aria-label="Tipo Telefone"
                      value={phone.phoneType}
                      disabled
                    >
                      <option>Tipo</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Celular">Celular</option>
                    </select>
                  </div>
                ))
              }
              {
                customer.emails.map((email, index) => (
                  <div className="d-flex flex-row" key={index}>
                    <div className="form-floating w-100">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Email"
                        value={email.emailAddress}
                        disabled
                      />
                      <label htmlFor="floatingPassword">Email {index + 1}</label>
                    </div>
                  </div>
                ))
              }

              <h2 className="mt-4">Endereço</h2>
              <hr />
              <div className="vstack gap-3">

                <div className="d-flex flex-row">
                  <div className="form-floating">
                    <input
                      value={customer.address.zipCode}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="CEP"
                      disabled
                    />
                    <label htmlFor="floatingPassword">CEP</label>
                  </div>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    value={customer.address.publicPlace}
                    placeholder="Logradouro"
                    disabled
                  />
                  <label htmlFor="floatingPassword">Logradouro</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    value={customer.address.district}
                    placeholder="Bairro"
                    disabled
                  />
                  <label htmlFor="floatingPassword">Bairro</label>
                </div>

                <div className="d-flex flex-row justify-content-between">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      value={customer.address.city}
                      placeholder="Cidade"
                      disabled
                    />
                    <label htmlFor="floatingPassword">Cidade</label>
                  </div>

                  <div className="form-floating ms-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      value={customer.address.state}
                      placeholder="UF"
                      disabled
                    />
                    <label htmlFor="floatingPassword">UF</label>
                  </div>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    value={customer.address.complement}
                    placeholder="Complemento"
                    disabled
                  />
                  <label htmlFor="floatingPassword">Complemento</label>
                </div>
              </div>
            </div>
            <div className="modal-footer mt-3">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
              <PermissionComponent role="ADMIN">
                <Link to={`/customer/update/${customer.id}`}> 
                  <button type="button" className="btn btn-warning" style={{ color: "white" }} data-bs-dismiss="modal">Editar</button>
                </Link>
              </PermissionComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}