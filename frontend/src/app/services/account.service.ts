import { Injectable } from '@angular/core';
import { AuthData, IAuthResponse } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/enums/roles.enum';
import { ApiConfiguration } from '../config/api.configuration';
import { ApiProvider } from './api/api';
@Injectable({
  providedIn: 'root',
})
export class AccountService extends ApiProvider{
  private _token: string | undefined;
  private _user: any;

  constructor(http: HttpClient , apiConfig: ApiConfiguration ) {
    super(http, apiConfig);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user)); 
  }

  getSessionUser() {
    return localStorage.getItem('user');
  }
  
  getSessionUserRoles() {
    return JSON.parse(localStorage.getItem('user')!).role ?? '';
  }

  public isSuperAdmin():boolean {
    //Esta funcion retorna si el usuario loggueado posee rol super-admin o no.
    let roles = [];
    let isSuperAdmin : boolean = false;
    roles = JSON.parse(localStorage.getItem('user')!).roles ?? [];

    roles.forEach((rol: any) => {
      if(rol === Roles.SuperAdmin){
        isSuperAdmin = true;
      }
    });

    return isSuperAdmin;
  }

  public isAdminInmobiliaria():boolean {
    //Esta funcion retorna si el usuario loggueado posee rol admin-inmobiliaria o no.
    let roles = [];
    let isAdminInmobiliaria : boolean = false;
    roles = JSON.parse(localStorage.getItem('user')!).roles ?? [];

    roles.forEach((rol: any) => {
      if(rol === Roles.AdminInmobiliaria){
        isAdminInmobiliaria = true;
      }
    });

    return isAdminInmobiliaria;
  }

  public isDeveloper():boolean {
    //Esta funcion retorna si el usuario loggueado posee rol 'Developer' o no.
    let rol = '';
    let isDeveloper : boolean = false;
    rol = JSON.parse(localStorage.getItem('user')!).role ?? '';

    if(rol === Roles.Developer){
      isDeveloper = true;
    }else{
      isDeveloper= false;
    }

    return isDeveloper;
  }

  logout() {
    this.setData({ isAuthenticated: false });
  }

  async isAuth(): Promise<boolean> {

    this._user = localStorage.getItem('user') ?? undefined;
    
    if (this._user) return true;
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
