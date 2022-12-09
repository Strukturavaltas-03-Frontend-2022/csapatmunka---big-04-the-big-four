import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface ITableCol {
  [x: string]: any;
  title: string;
  key: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends { [x: string]: any }>
  implements OnInit {
  // Dynamic table components
  @Input() list: T[] = [];
  @Input() columns: ITableCol[] = [];

  // Variables for sorting
  sortKey: string = 'name';
  sortDirection: number = 1;

  //filter
  phrase: string = '';
  filterKey: string = '';

  //pagination
  page: number = 1;

  // Table button operations
  @Output() onSelect: EventEmitter<T> = new EventEmitter();
  @Output() onDelete: EventEmitter<T> = new EventEmitter();
  @Output() onCreate: EventEmitter<T> = new EventEmitter();

  //Toaster
  toastr: ToastrService = inject(ToastrService);

  // Drag columns
  lastDragKey = '';

  constructor() { }

  ngOnInit(): void {

  }

  // Table button methods
  raiseSelect(row: T): void {
    this.onSelect.emit(row);
  }

  raiseDelete(row: T): void {
    this.onDelete.emit(row);
  }

  raiseCreate(): void {
    this.onCreate.emit();
  }

  sortRequest(key: string): void {
    if (key === this.sortKey) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }
    this.sortKey = key;
  }
  //Toaster
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!', { timeOut: 6000 });
  }
  showError() {
    this.toastr.error('The item has been successfully deleted.', 'Deleted!');
  }


  onHeaderDragStart(ev: DragEvent): void {
    this.lastDragKey = (ev.target as HTMLTableCellElement).id;
  }

  onHeaderDrop(ev: DragEvent): void {
    ev.preventDefault();
    const targetID: string = (ev.target as HTMLTableCellElement).id;
    const fromIndex = this.columns.findIndex(col => col.key === this.lastDragKey)
    const toIndex = this.columns.findIndex(col => col.key === targetID)
    this.swapColumns(fromIndex, toIndex)
  }

  swapColumns(from: number = 2, to: number = 0) {
    const temp = { ...this.columns[from] }
    this.columns.splice(from, 1);
    this.columns.splice(to, 0, temp);
  }
}
