import { Component, EventEmitter, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ComponentsConfig } from '../../../../components.config';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent {
  public componentsConfig = ComponentsConfig.getInstance();
  public params = this.componentsConfig.postUserModalConfig;
  public formIsValid = false;
  public errorInput: boolean = false;
  public companyId : number = 0;

  @Output() confirm = new EventEmitter<Boolean>();

  public formValues = {
    name: '',
    lastName: '',
    cuil: '',
    email: '',
    rolId: '',
    companyId: ''
  };

  public inputStates = {
    name: false,
    lastName: false,
    cuil: false,
    email: false
  };

  constructor(
    private readonly modalService: NzModalService,
    private readonly nzNotification: NzNotificationService,
    private readonly userService: UsersService
  ) {}

  ngOnInit(): void {
    this.params.postUser = {
      ...this.params.postUser,
      disabled: true,
    };
    this.clearInputs();
  }

  cancel() {
    //Funcion que cierra el modal
    this.modalService.closeAll();
  }

  onValueChange() {
    this.formValues = {
      ...this.formValues,
      name: this.params.name.inputGroup.input.value,
      lastName: this.params.lastName.inputGroup.input.value,
      cuil: this.params.cuil.inputGroup.input.value,
      email: this.params.email.inputGroup.input.value,
      rolId: this.params.role.listOfSelectedValue,
      companyId: this.params.company.listOfSelectedValue
    };
    this.validateForm();
  }

  validateForm() {
    this.formIsValid =
      this.formValues.name !== '' &&
      this.formValues.lastName !== '' &&
      this.formValues.cuil !== '' &&
      this.formValues.email !== '' &&
      this.params.role.listOfSelectedValue.length !== 0 &&
      this.params.company.listOfSelectedValue.length !== 0 &&
      this.inputStates.name &&
      this.inputStates.lastName &&
      this.inputStates.cuil &&
      this.inputStates.email;

    if(this.formIsValid){
      this.params.postUser = {
        ...this.params.postUser,
        disabled: false,
      };
    }else{
      this.params.postUser = {
        ...this.params.postUser,
        disabled: true,
      };
    }
  }

  clearInputs() {
    this.params.role.listOfSelectedValue = [];
    this.params.name.inputGroup.input.value = '';
    this.params.lastName.inputGroup.input.value = '';
    this.params.cuil.inputGroup.input.value = '';
    this.params.email.inputGroup.input.value = '';
    this.params.company.listOfSelectedValue = [];
  }

  nameIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.name = valid;
    this.validateForm();
  }

  lastNameIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.lastName = valid;
    this.validateForm();
  }

  cuilIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.cuil = valid;
    this.validateForm();
  }

  emailIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.email = valid;
    this.validateForm();
  }

  
  async postUser() {
    
    this.params.postUser = {
      ...this.params.postUser,
      disabled:true,
      loading: true
    };

    const payload = {
      name: this.formValues.name,
      lastName: this.formValues.lastName,
      roleId: this.formValues.rolId,
      companyId: this.formValues.companyId,
      userName: this.formValues.cuil,
      email: this.formValues.email
    };

  }
}
