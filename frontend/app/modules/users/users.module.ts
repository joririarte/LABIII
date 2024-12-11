import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostUserComponent } from './modals/post-user/post-user.component';
import { UpdateUserComponent } from './modals/update-user/update-user/update-user.component';
import { UsersTableComponent } from './tables/users-table/users-table.component';
import { UserComponent } from './pages/user/user/user.component';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../../ng-zorro.module';


@NgModule({
  declarations: [
    PostUserComponent,
    UpdateUserComponent,
    UserComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
  ]
})
export class UsersModule { }
