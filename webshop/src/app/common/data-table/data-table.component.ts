import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ITableCol {
  [x: string]: any;
  title: string;
  key: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends {[x: string]: any}> implements OnInit {

  @Input() list: T[] = [];

  @Input() columns: ITableCol[] = [];

  @Output() onSelect: EventEmitter<T> = new EventEmitter();

  @Output() onDelete: EventEmitter<T> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  raiseSelect(row: T): void {
    this.onSelect.emit(row);
  }

  raiseDelete(row: T): void {
    this.onDelete.emit(row);
  }

}
