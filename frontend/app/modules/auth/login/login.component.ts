import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ComponentsConfig } from '../../../components.config';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service';
import { AuthProvider } from '../../../services/auth/auth';
import { ConfigService } from '../../../config/config.service';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { IAuthRequest } from '../../../interfaces/auth.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateUserComponent } from '../create-user/create-user.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  public componentsConfig = ComponentsConfig.getInstance();
  public loginPageParams = this.componentsConfig.loginPageConfig;
  public loading = false;
  public isAuth: Boolean | undefined;
  public user: any;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NzNotificationService,
    private readonly modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.loading = true;

    if (this.loginForm.valid) {
      let userRequest: IAuthRequest = { 
        username: this.loginForm.value.userName, 
        password: this.loginForm.value.password
      };

      this.authService.login(userRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/main/home']);
          this.accountService.setUser(response);
          this.loading = false;
        },
        error: (err) => {
          this.notificationService.error('Error', err.error.error);
          this.loading = false;
        }
      });
    }
  }

  createUser(){
    const modalCreateUser = this.modalService.create({
      nzContent: CreateUserComponent,
      nzWidth: '500px',
      nzFooter: null,
      nzComponentParams: {},
    });

    modalCreateUser.componentInstance?.confirm.subscribe(
      (confirm: any) => {
        if(confirm){}
      }
    );
  }

}
