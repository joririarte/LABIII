/*import { Injectable } from '@angular/core';
import config from './config';
import { Environment } from 'src/environments/environment';

@Injectable()
export class ApiConfiguration {
  private static apiConfig: ApiConfiguration;

  public constructor() {
    this.setUris();
  }

  public getInstance(): ApiConfiguration {
    if (!ApiConfiguration.apiConfig) {
      ApiConfiguration.apiConfig = new ApiConfiguration();
    }
    return ApiConfiguration.apiConfig;
  }

  //Configuracion de ambientes
  private setUris() {
    if (config.environment === Environment.DEV) {
      config.apiUrl = config.apiDesa;
    }else if (config.environment === Environment.TEST) {
      config.apiUrl = config.apiTest;
    }else if (config.environment === Environment.PRE) {
      config.apiUrl = config.apiPre;
    } 
    else if (config.environment === Environment.PROD) {
    //  config.apiUrl = config.apiProd;
    } else if (config.environment === Environment.LOCALHOST) {
      config.apiUrl = config.apiLocal;
    }
  }
}*/
