import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PostUserComponent } from '../../../modals/post-user/post-user.component';
import { UpdateUserComponent } from '../../../modals/update-user/update-user/update-user.component';
import { ComponentsConfig } from '../../../../../components.config';
import { UsersService } from '../../../../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public loading: boolean = false;

  public componentsConfig = ComponentsConfig.getInstance();
  public params = this.componentsConfig.usersPageConfig;
  public usersResponse!: any[];

  constructor(private userService : UsersService , private readonly modalService: NzModalService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    //Esta funcion consume endpoint para obtener listado de usuarios.
    this.loading = true;
    
    this.userService.getUsers()
    .subscribe(
      (res: any) => {
        this.usersResponse = res;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
    
  }

  getItemEvent(e: any) {
    //Obtenemos los valores de la fila clickeada
    switch (e.event.value) {
      case 'VIEW_USER':
        this.viewUser(e.id);
        break;
      default:
        break;
    }
  }

  viewUser(userId: string) {
    const modalUpdateUser = this.modalService.create({
      nzContent: UpdateUserComponent,
      nzWidth: '500px',
      nzFooter: null,
      nzComponentParams: {
        userId : userId
      },
    });

    modalUpdateUser.componentInstance?.confirm.subscribe(
      (confirm: any) => {
        if(confirm){
          this.getUsers();
        }
      }
    );
  }

  addUser() {
    const modalAddTemplate = this.modalService.create({
      nzContent: PostUserComponent,
      nzWidth: '500px',
      nzFooter: null,
      nzComponentParams: {
      },
    });

    modalAddTemplate.componentInstance?.confirm.subscribe(
      (confirm: any) => {
        if(confirm){
          this.getUsers();
        }
      }
    );

  }
}
