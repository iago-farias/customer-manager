export interface ApiError {
  hasSubmited: boolean;
  name?: string;
  cpf?: string;
  address?: {
    zipCode?: string;
    publicPlace?: string;
    city?: string;
    state?: string;
    district?: string;
  }
}