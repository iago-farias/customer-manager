
export interface Customer {
  id: number;
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
  district: string;
  complement: string;
}

export interface Phone {
  number: string;
  phoneType: string;
}

export interface Email {
  emailAddress: string;
}

export interface CustomerPage {
  content: Customer[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}