
export interface Customer {
  name: string;
  cpf: string;
  address: Address;
  phones: Phone[];
  emails: Email[];
}

interface Address {
  zipCode: string;
  publicPlace: string;
  city: string;
  state: string;
  complement: string;
}

export interface Phone {
  number: string;
  phoneType: string;
}

export interface Email {
  emailAddress: string;
}