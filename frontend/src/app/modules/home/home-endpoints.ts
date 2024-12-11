export interface IGetContractsToPdfPayload {
  isRescind: boolean;
  expirationDay?: number;
  updateDay?: number;
  template: string;
}
