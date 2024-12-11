import Config from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { ApiConfiguration } from '../../config/api.configuration';
import { IAuthResponse } from '../../interfaces/auth.interface';

@Injectable()
export class AuthProvider extends ApiProvider{

  private _token: string | undefined;
  /**
   * Token del usuario autenticado.
   */
  constructor(http: HttpClient, apiConfig: ApiConfiguration) {
    super(http, apiConfig);
  }

  /**
   * Inicia la sesión para un usuario.
   * @param username Nombre del usuario.
   * @param password Contraseña.
   */
  login(username: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      //login

      this.http
        .get<IAuthResponse>(
          this.apiUrl + `v1/Token?UserName=${username}&Password=${password}`
        )
        .subscribe(
          (resp: any) => {
            this._token = resp.data.access_token;

            this.setData({
              token: resp.data.access_token,
              isAuthenticated: true,
            }).then(() => {
              resolve(resp);
            });
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Finaliza la sesión del usuario.
   */
  logout() {
    this.setData({ isAuthenticated: false });
  }

  /**
   * Permite determinar si un usuario está autenticado.
   */
  async isAuth(): Promise<boolean> {
    if (!this._token) {
      this._token = localStorage.getItem('token') ?? undefined;
    }

    if (this._token) return true;
    else return false;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public setToken(token: string) {
    this._token = token;
  }

  public setData(data: AuthData) {
    const token = data.isAuthenticated ? data.token : undefined;
    this._token = token;
    // Retornamos una promesa que almacena los datos en el localStorage
    return new Promise((resolve, reject) => {
      localStorage.setItem('token', token ?? '');
      resolve(true);
    });
  }
}

class AuthData {
  token?: string;
  isAuthenticated: boolean = false;
}
