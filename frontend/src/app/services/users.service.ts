import { Injectable } from '@angular/core';
import { ApiProvider } from './api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfiguration } from '../config/api.configuration';
import { mergeMap, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiProvider{

  constructor(http: HttpClient, apiConfig: ApiConfiguration) {
    super(http, apiConfig);
  }

  // Método para obtener los puntajes
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '');
  }

  postUser(payload: any) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    formData.append('email', payload.email);
  
    return this.http.post(this.apiUrl + 'usuarios/CrearUsuario.php', formData);
  }

  //Obtener User por id
  public getUserById(userId: number) {
    const url = `${this.apiUrl}User/${userId}`;
    return this.http.get<any>(url);
  }

  public updateUser(user: any) {
    return this.http
      .put<any>(`${this.apiUrl}User`, user)
      .pipe(mergeMap((v) => (v.success ? of(v) : throwError(v.message))));
  }
  
}
