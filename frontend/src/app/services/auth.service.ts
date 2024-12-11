import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IAuthRequest, IAuthResponse } from '../interfaces/auth.interface';
import { ApiConfiguration } from '../config/api.configuration';
import { LoginProvider } from '../models/enums/loginProviders';
import { ApiProvider } from './api/api';
import config from '../config/config';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiProvider {
  constructor(
    http: HttpClient,
    private router: Router,
    apiConfig: ApiConfiguration
  ) {
    super(http, apiConfig);
  }

  public login(loginForm: IAuthRequest) {
    const formData = new FormData();
    formData.append('username', loginForm.username);
    formData.append('password', loginForm.password);
  
    return this.http.post(this.apiUrl + 'usuarios/VerifyUser.php', formData);
  }
  
}
