export interface IPerson {
  name: string;
  lastName: string;
  documentNumber?: string;
  phoneNumber: string;
  email: string;
  cuitCuilNumber: string;
  birthdate: string;
  personStatusId: number;
  fiscalConditionId: number;
  address: any;
  isNaturalPerson: boolean;
  cash?: boolean;
  cbu?: string;
  transference?: boolean;
  personId?: number;
  entityID? :number;
  rol?: string;
}

export interface IPersonResponse {
  success: boolean;
  message: string;
  data: any;
  code: string;
  statusCode: string;
}

export interface IAddress {
  streetName: string;
  floor?: string;
  apartment?: string;
  zipCode: string;
  tower?: string;
  cityId: number;
  neighborhoodId?: number | string | null;
}

export interface IPostPersonResponse {
  success: boolean;
  message: string;
  data: any;
}
export interface IPutPersonResponse {
  success: boolean;
  message: string;
  data: any;
  code: string;
  statusCode: string;
}

export interface IPersonFilter {
  name?: string;
  lastName?: string;
  multiSearch?:string;
  documentNumber?: string;
  cuilNumber?: string;
  pageSize?: number;
  pageIndex?: number;
}
