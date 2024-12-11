import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../config/config';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public version: string = config.version;
  public year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {
  }
  
}
