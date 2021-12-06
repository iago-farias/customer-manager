import axios from "axios";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function getAddressFromCEP(CEP : string) : Promise<ViaCepResponse| undefined>{
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
    const address = response.data as ViaCepResponse;
  
    return address;  
  } catch(err){
    console.log(err);
  }
}