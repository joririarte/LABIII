import config from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../config/api.configuration';

export abstract class ApiProvider {
  protected apiUrl: string = "";
  protected apiLocal: string = "";
  protected apiDesa: string = "";
  protected url: string = "";

  constructor(protected http: HttpClient, private apiConfig: ApiConfiguration) {
    
  this.apiUrl = this.apiConfig.configService.apiUrl!;
  this.apiLocal = this.apiConfig.configService.apiLocal!;
  this.apiDesa = this.apiConfig.configService.apiDesa!;
  }
}
