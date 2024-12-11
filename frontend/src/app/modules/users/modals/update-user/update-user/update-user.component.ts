import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ComponentsConfig } from '../../../../../components.config';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  public componentsConfig = ComponentsConfig.getInstance();
  public params = this.componentsConfig.updateUserModalConfig;
  public userResponse!: any;
  public formIsValid = false;
  public loading = false;

  public formValues = {
    name: '',
    cuil: '',
    roleId: '',
    companyId: ''
  };

  public inputStates = {
    name: true,
    cuil: true
  };

  @Input() userId: any;
  @Output() confirm = new EventEmitter<Boolean>();

  constructor(
    private readonly modalService: NzModalService,
    private readonly nzNotification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.params.updateUser = {
      ...this.params.updateUser,
      disabled: true,
    };
  }

  cancel() {
    //Funcion que cierra el modal
    this.modalService.closeAll();
  }

  validateForm() {
    this.formIsValid =
    this.formValues.name !== '' &&
    this.formValues.roleId !== '' &&
    this.formValues.companyId !== '' &&
    this.formValues.cuil !== '' &&
    this.inputStates.name &&
    this.inputStates.cuil;

    if(this.formIsValid){
      this.params.updateUser = {
        ...this.params.updateUser,
        disabled: false,
      };
    }else{
      this.params.updateUser = {
        ...this.params.updateUser,
        disabled: true,
      };
    }
  }

  onValueChange() {
    this.formValues = {
      ...this.formValues,
      name: this.params.name.inputGroup.input.value,
      cuil: this.params.cuil.inputGroup.input.value,
      roleId: this.params.role.listOfSelectedValue,
      companyId : this.params.company.listOfSelectedValue
    };
    this.validateForm();
  }

  nameIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.name = valid;
    this.validateForm();
  }

  cuilIsValid(valid: boolean) {
    //Esta funcion recibe true o false dependiendo si el input recibe datos erroneos.
    this.inputStates.cuil = valid;
    this.validateForm();
  }

  async updateUser() {
    this.params.updateUser = {
      ...this.params.updateUser,
      loading: true,
      disabled: true
    };

    const payload = {
      id: this.userResponse.id,
      name: this.formValues.name,
      username: this.formValues.cuil,
      roleId: this.formValues.roleId,
      companyId: this.formValues.companyId
    };

  }
}
