import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Puntuaciones', icon: 'table' },
    { label: 'Cuestionarios', icon: 'book' },
    { label: 'Cerrar sesión', icon: 'logout' },
  ];

  constructor(private router: Router, private readonly modalService: NzModalService) {
    if (window.innerWidth < 768) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.isCollapsed = true;
        }
      });
    }
  }

  ngOnInit(): void {

  }

  itemClick(item:any){
    this.isCollapsed = false;
    
    switch(item.label){
      case 'Home':
        this.router.navigate(['/main/home']);
      break;
      case 'Puntuaciones':
        this.router.navigate(['/main/score']);
        break;
      case 'Cuestionarios':
        this.router.navigate(['/main/questionnaire-list']);
        break;
      case 'Cerrar sesión':
        this.logout();
        break;
    }
  }

  logout(): void {
    const text = `¿Estás seguro que deseas cerrar sesión?`;

    this.modalService.confirm({
      nzTitle: 'Cerrar sesión',
      nzContent: text,
      nzOkText: 'Confirmar',
      nzOnOk: async () => {
        // Limpia todos los datos del local storage
        localStorage.clear();
        this.modalService.closeAll();
        // Redirige a la página de inicio de sesión
        this.router.navigate(['/auth/login']);
      },
      nzCancelText: 'Cancelar',
      nzOnCancel: () => {
        this.modalService.closeAll();
      },
    });
  }
}
