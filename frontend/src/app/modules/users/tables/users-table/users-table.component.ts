import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input() params!: any;
  @Input() users: any[] = [];
  @Input() loading = false;

  @Output() itemEvent = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();

  constructor(private readonly nzContextMenuService: NzContextMenuService) {}

  ngOnInit(): void {
  }

  emitEvent(e: any, id: number) {
    this.itemEvent.emit({ event: e, id: id });
  }

  rowClickEventHandler(e: any, rowId: string) {
    this.rowClick.emit({ event: e, id: rowId });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
}
