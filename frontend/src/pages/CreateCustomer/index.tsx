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
  const [errors, setErrors] = useState<ApiError>({ hasSubmited: false });

  useEffect(() => {
    document.title = "Customer Manager | Cadastro de Cliente"
  }, []);

  function cleanMask(data: string) {
    return data.replace(/[-\.() ]/g, '');
  }

  async function handleSearchAddress() {
    setIsGettingAddress(true);
    try {
      const address = await getAddressFromCEP(cleanMask(zipCode));
      setIsGettingAddress(false);

      if(!address){
        alert("Não foi possível encontrar o CEP");
        return;
      }
  
      setCity(address.localidade);
      setDistrict(address.bairro);
      setPublicPlace(address.logradouro);
      setState(address.uf);
    } catch(err){
      alert("Não foi possível encontrar o CEP");
      setIsGettingAddress(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isLoading) {
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
      const response = await api.post('/customers/create', {
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
      alert(response.data);
    } catch (err: any) {
      const apiError = err.response.data;
      setIsLoading(false);
      setErrors({
        hasSubmited: true, address: {
          zipCode: apiError["address.zipCode"],
          city: apiError["address.city"],
          district: apiError["address.district"],
          publicPlace: apiError["address.publicPlace"],
          state: apiError["address.state"]
        }, ...apiError
      });
      console.log(apiError);
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
                  className={`form-control ${errors.name !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                />
                <label htmlFor="name">Nome completo</label>
                <div className="invalid-feedback">
                  {errors?.name}
                </div>
              </div>
              <div className="form-floating">

                <InputMask
                  mask="99.999.999.999"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  type="text"
                  className={`form-control ${errors.cpf !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                  id="cpf"
                  placeholder="CPF"
                />
                <label htmlFor="cpf">CPF</label>
                <div className="invalid-feedback">
                  {errors?.cpf}
                </div>
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
                        className={`form-control ${phone.number === "" && errors.hasSubmited ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                        placeholder="Telefone"
                        value={phone.number}
                        onChange={(e) => setPhones(old => {
                          old[index].number = e.target.value;
                          return [...old];
                        })}
                      />
                      <label>Telefone {index + 1} </label>
                      <div className="invalid-feedback">
                        O número de telefone é obrigatório
                      </div>
                    </div>

                    <select
                      className="form-select w-50 ms-3"
                      style={{maxHeight: 58}}
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
                          style={{maxHeight: 58}}
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
                        className={`form-control ${email.emailAddress === "" && errors.hasSubmited ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                        placeholder="Email"
                        value={email.emailAddress}
                        onChange={(e) => setEmails(old => {
                          old[index].emailAddress = e.target.value;
                          return [...old];
                        })}
                      />
                      <label>Email {index + 1}</label>
                      <div className="invalid-feedback">
                        O email é obrigatório
                      </div>
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
                    className={`form-control ${errors.address?.zipCode !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                    placeholder="CEP"
                    disabled={isGettingAddress}
                  />
                  <label>CEP</label>
                  <div className="invalid-feedback">
                    {errors.address?.zipCode}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary ms-3"
                  style={{maxHeight: 58}}
                  onClick={() => handleSearchAddress()}
                >
                  <FaSearch />
                </button>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${errors.address?.publicPlace !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                  onChange={(e) => setPublicPlace(e.target.value)}
                  value={publicPlace}
                  placeholder="Logradouro"
                  disabled={isGettingAddress}
                />
                <label>Logradouro</label>
                <div className="invalid-feedback">
                  {errors.address?.publicPlace}
                </div>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${errors.address?.district !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                  placeholder="Bairro"
                  disabled={isGettingAddress}
                />
                <label>Bairro</label>
                <div className="invalid-feedback">
                  {errors.address?.district}
                </div>
              </div>

              <div className="d-flex flex-row justify-content-evenly">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${errors.address?.city !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}

                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="Cidade"
                    disabled={isGettingAddress}
                  />
                  <label>Cidade</label>
                  <div className="invalid-feedback">
                    {errors.address?.city}
                  </div>
                </div>

                <div className="form-floating ms-3">
                  <input
                    type="text"
                    className={`form-control ${errors.address?.state !== undefined ? "is-invalid" : errors.hasSubmited ? "is-valid" : ""}`}

                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="UF"
                    disabled={isGettingAddress}
                  />
                  <label>UF</label>
                  <div className="invalid-feedback">
                    {errors.address?.state}
                  </div>
                </div>
              </div>


              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setComplement(e.target.value)}
                  value={complement}
                  placeholder="Complemento"
                  disabled={isGettingAddress}
                />
                <label>Complemento</label>
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