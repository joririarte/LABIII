import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEventsService } from '../app/app-events.service';
import { Observable ,throwError} from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthProvider } from '../auth/auth';
import { catchError } from 'rxjs/operators'; // Importa catchError desde RxJS
import { AppEvent } from '../../models/enums/app-events.enum';

@Injectable()
export class BtnInterceptor implements HttpInterceptor {
  constructor(
    private appEventsService: AppEventsService,
    private authProvider: AuthProvider
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    this.authProvider.isAuth();
    const token = this.authProvider.token;

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `bearer ${token}`),
    });

    let gotoLogin: boolean = false;

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.appEventsService.dispatch(
            AppEvent.UserLogout,
            'La sesión ha expirado'
          );
        }
        if (!error.status) {
          error.message =
            'Hubo un problema al establecer la conexión con el servidor. Por favor verifique su conexión en la pantalla "Acerca de..."';
        }
        return throwError(error);
      })
    );
  }
}
