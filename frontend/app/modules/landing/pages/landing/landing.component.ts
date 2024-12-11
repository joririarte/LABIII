import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from '../../../auth/create-user/create-user.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{

  constructor(private readonly modalService: NzModalService) {}

  ngOnInit(): void {}
  
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
