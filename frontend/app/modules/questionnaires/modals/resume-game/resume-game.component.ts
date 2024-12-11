import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-resume-game',
  templateUrl: './resume-game.component.html',
  styleUrls: ['./resume-game.component.scss']
})
export class ResumeGameComponent implements OnInit{

  @Input() data:any;

  constructor(private readonly modalService: NzModalService,private router: Router){}

  ngOnInit(): void {}

  Close(){
    this.modalService.closeAll();
    this.router.navigate(['/main/score']);
  }
}
