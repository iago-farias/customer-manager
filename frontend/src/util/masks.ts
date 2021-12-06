import { Phone } from "../types/Customer";


export function cpfMask(cpf : string){
  if(cpf.length !== 11){
    return cpf;
  }

  return `${cpf.slice(0,2)}.${cpf.slice(2,5)}.${cpf.slice(5,8)}.${cpf.slice(8,11)}`
}

export function phoneMask(phone : Phone){
  if(phone.number.length > 11){
    return;
  }

  if(phone.phoneType === "Residencial" || "Comercial"){
    return `(${phone.number.slice(0,2)}) ${phone.number.slice(2,6)}-${phone.number.slice(6,10)}`
  }

  if(phone.phoneType === "Celular"){
    return `(${phone.number.slice(0,2)}) ${phone.number.slice(2,7)}-${phone.number.slice(7, 11)}`
  }
}

export function cepMask(cep : string) {
  if(cep.length < 8){
    return;
  }

  return `${cep.slice(0, 2)}.${cep.slice(2, 5)}-${cep.slice(5,8)}`
}