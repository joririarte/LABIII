import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

export const isDeveloperGuard:CanActivateFn = ( route , state )=> {
  
  const accountService = inject(AccountService);

  return accountService.isDeveloper();
};