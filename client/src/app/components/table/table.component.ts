import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'siat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Input() tableData: [];
  @Input() columns: [];
  @Input() hasActions = true;

  constructor() { }

  ngOnInit(): void {
  }

  getKeys(){
    return (this.tableData && this.tableData.length > 0) ?  Object.keys(this.tableData[0]) : [];
  }

  deleteRow(id){
    this.delete.emit(id);
  }

  editRow(id){
    this.edit.emit(id);
  }

}
