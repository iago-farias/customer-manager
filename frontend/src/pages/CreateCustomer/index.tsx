import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa';

import Header from "../../components/Header";
import { Email, Phone } from '../../types/Customer';
import { getAddressFromCEP } from '../../services/viaCep';
import { api } from '../../services/api';
import { ApiError } from '../../types/ApiError';

export default function CreateCustomer() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [publicPlace, setPublicPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [complement, setComplement] = useState('');
  const [emails, setEmails] = useState<Email[]>([{ emailAddress: '' }]);
  const [emailsCount, setEmailsCount] = useState(0);
  const [phones, setPhones] = useState<Phone[]>([{ number: '', phoneType: 'Residencial' }]);
  const [phonesCount, setPhonesCount] = useState(0);
  const [isGettingAddress, setIsGettingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    document.title = "Customer Manager | Cadastro de Cliente"
  }, []);

  function cleanMask(data: string) {
    return data.replace(/[-\.() ]/g, '');
  }

  async function handleSearchAddress() {
    setIsGettingAddress(true);
    const address = await getAddressFromCEP(cleanMask(zipCode));
    setIsGettingAddress(false);

    setCity(address.localidade);
    setDistrict(address.bairro);
    setPublicPlace(address.logradouro);
    setState(address.uf);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(isLoading){
      return;
    }

    const cleanCpf = cleanMask(cpf);
    const cleanZipCode = cleanMask(zipCode);
    const cleanPhones = phones.map(phone => {
      phone.number = cleanMask(phone.number);

      return phone;
    });

    try {
      setIsLoading(true);
      await api.post('/customers/create', {
        name,
        cpf: cleanCpf,
        address: {
          zipCode: cleanZipCode,
          publicPlace,
          district,
          city,
          complement,
          state
        },
        phones: [...cleanPhones],
        emails: [...emails]
      });
      setIsLoading(false);
      clearInputs();
      window.scrollTo(0, 0);
    } catch (err: any) {
      const apiError = err.response as ApiError;
      setIsLoading(false);
      alert(apiError.data.message);
    }
  }

  function clearInputs() {
    setName('');
    setCpf('')
    setZipCode('');
    setPublicPlace('');
    setDistrict('');
    setState('');
    setCity('');
    setComplement('');
    setPhones([{ number: '', phoneType: 'Celular' }]);
    setEmails([{ emailAddress: '' }]);
    setEmailsCount(0);
    setPhonesCount(0);
  }

  function addEmail() {
    setEmails(old => [...old, { emailAddress: '' }]);
    setEmailsCount(old => old + 1);
  }

  function removeEmail() {
    setEmails(old => {
      old.splice(emailsCount, 1);
      return [...old];
    });
    setEmailsCount(old => old - 1);
  }

  function addPhone() {
    setPhones(old => [...old, { number: '', phoneType: 'Celular' }]);
    setPhonesCount(old => old + 1);
  }

  function removePhone() {
    setPhones(old => {
      old.splice(phonesCount, 1);
      return [...old];
    });

    setPhonesCount(old => old - 1);
  }

  return (
    <>
      <Header />

      <div className="container py-3">
        <h1 className="text-center py-3">Cadastro de cliente</h1>

        <div className="d-flex justify-content-center mt-3">

          <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
            <div className="vstack gap-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                />
                <label htmlFor="floatingInputName">Nome completo</label>
              </div>
              <div className="form-floating">

                <InputMask
                  mask="99.999.999.999"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="CPF"
                />
                <label htmlFor="floatingPassword">CPF</label>
              </div>
            </div>

            <h2 className="mt-4">Contato</h2>
            <hr />
            <div className="vstack gap-3">
              {
                phones.map((phone, index) => (
                  <div className="d-flex flex-row" key={index}>
                    <div
                      className="form-floating"
                      key={index}
                    >
                      <InputMask
                        mask={phone.phoneType === "Celular" ? "(99) 99999-9999" : "(99) 9999-9999"}
                        type="tel"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Telefone"
                        value={phone.number}
                        onChange={(e) => setPhones(old => {
                          old[index].number = e.target.value;
                          return [...old];
                        })}
                      />
                      <label htmlFor="floatingPassword">Telefone {index + 1} </label>
                    </div>

                    <select
                      className="form-select w-50"
                      aria-label="Tipo Telefone"
                      value={phone.phoneType}
                      onChange={(e) => setPhones(old => {
                        old[index].phoneType = e.target.value;
                        return [...old];
                      })}
                    >
                      <option>Tipo</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Celular">Celular</option>
                    </select>
                    {
                      index > 0 && (
                        <button
                          type="button"
                          className="btn"
                          onClick={() => removePhone()}
                        >
                          <FaTimes color="#dc3545" />
                        </button>
                      )
                    }
                  </div>
                ))
              }
              <button
                type="button"
                className="btn btn-primary mw-10"
                onClick={() => addPhone()}
              >
                <FaPlus />
              </button>
              {
                emails.map((email, index) => (
                  <div className="d-flex flex-row" key={index}>
                    <div className="form-floating w-100">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Email"
                        value={email.emailAddress}
                        onChange={(e) => setEmails(old => {
                          old[index].emailAddress = e.target.value;
                          return [...old];
                        })}
                      />
                      <label htmlFor="floatingPassword">Email {index + 1}</label>
                    </div>
                    {
                      index > 0 && (
                        <button
                          type="button"
                          className="btn"
                          onClick={() => removeEmail()}
                        >
                          <FaTimes color="#dc3545" />
                        </button>
                      )
                    }
                  </div>
                ))
              }

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addEmail()}
              >
                <FaPlus />
              </button>
            </div>

            <h2 className="mt-4">Endereço</h2>
            <hr />
            <div className="vstack gap-3">

              <div className="d-flex flex-row">
                <div className="form-floating">
                  <InputMask
                    mask="99.999-999"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="CEP"
                    disabled={isGettingAddress}
                  />
                  <label htmlFor="floatingPassword">CEP</label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary ms-3"
                  onClick={() => handleSearchAddress()}
                >
                  <FaSearch />
                </button>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => setPublicPlace(e.target.value)}
                  value={publicPlace}
                  placeholder="Logradouro"
                  disabled={isGettingAddress}
                />
                <label htmlFor="floatingPassword">Logradouro</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                  placeholder="Bairro"
                  disabled={isGettingAddress}
                />
                <label htmlFor="floatingPassword">Bairro</label>
              </div>

              <div className="d-flex flex-row justify-content-evenly">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="Cidade"
                    disabled={isGettingAddress}
                  />
                  <label htmlFor="floatingPassword">Cidade</label>
                </div>

                <div className="form-floating ms-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="UF"
                    disabled={isGettingAddress}
                  />
                  <label htmlFor="floatingPassword">UF</label>
                </div>
              </div>


              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => setComplement(e.target.value)}
                  value={complement}
                  placeholder="Complemento"
                  disabled={isGettingAddress}
                />
                <label htmlFor="floatingPassword">Complemento</label>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isGettingAddress}
              >
                {
                  isLoading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : "Salvar"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}