import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiConfiguration {

  public constructor(@Inject(ConfigService) public configService: ConfigService, private http: HttpClient) { }

  public load() {
    return new Promise((resolve) => {
      if (!environment.production) {
        this.setSettings(require('./config.json'));
        resolve(true);
      }
      else {
        firstValueFrom(this.http.get(`./config.json?v=${new Date().getTime()}`)).then((settings: any) => {
          this.configService.apiUrl = settings.apiUrl;
          resolve(true);
        }).catch(() => {
          console.log('No se pudo cargar la configuración de la API, corroborar que el archivo config.json exista en la raíz del sitio web.');
          resolve(true);
        });
      }
    });
  }

  /**
   * Configura las propiedades de API con los valores del objeto settings.
   * @param settings objeto con las propiedades de configuración
   */
  private setSettings(settings: any) {
    this.configService.apiUrl = settings.apiUrl;
    this.configService.apiLocal = settings.apiLocal;
    this.configService.apiDesa = settings.apiDesa;
    this.configService.redirectLocalHost = settings.redirectLocalHost;
    this.configService.redirectDesa = settings.redirectDesa;
  }
}
