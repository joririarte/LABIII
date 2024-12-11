import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  @Output() confirm = new EventEmitter<Boolean>();
  public submitButton = true;
  public formIsValid: boolean = false;
  public loading: boolean = false;

  public formValues = {
    username: '',
    password: '',
    email: ''
  };
  
  constructor(
    private readonly modalService: NzModalService,
    private userService : UsersService,
    private nzNotification: NzNotificationService) {}

  ngOnInit(): void {}

  cancel() {
    //Funcion que cierra el modal
    this.modalService.closeAll();
  }

  userNameChange(value: string): void {
    this.formValues.username = value;

    this.validateForm();
  }

  passwordChange(value: string): void {
    this.formValues.password = value;

    this.validateForm();
  }

  emailChange(value: string): void {
    this.formValues.email = value;

    this.validateForm();
  }

  validateForm(){
    console.log(this.formValues);
    
    this.formIsValid =
      this.formValues.username !== '' &&
      this.formValues.password !== '' &&
      this.formValues.email !== '';

    if(this.formIsValid){
      this.submitButton = false;
    }else{
      this.submitButton = true;
    }
  }
  
  async postUser() {
    
    this.loading = true;
    this.submitButton = false;

    const payload = {
      username: this.formValues.username,
      password: this.formValues.password,
      email: this.formValues.email
    };

    // Llamar al endpoint para enviar los datos
    this.userService.postUser(payload).subscribe(
      (response) => {
        this.confirm.emit(true);
        this.nzNotification.create('success','Usuario creado','El usuario fue creado con éxito');
        this.modalService.closeAll();
        this.loading = false;
      },
      (error) => {
        this.confirm.emit(false);
        this.modalService.closeAll();
        this.loading = false;
      }
    );
  }
}
