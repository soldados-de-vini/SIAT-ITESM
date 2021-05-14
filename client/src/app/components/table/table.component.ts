import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'siat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() openElement = new EventEmitter<any>();
  @Input() tableData: Array<any>;
  @Input() columns: Array<any>;
  @Input() hasActions = true;
  @Input() hasSearchBar = true;
  @Input() loading: boolean;
  @Input() hasOpenButton: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getKeys(){
    return (this.tableData && this.tableData.length > 0) ?  Object.keys(this.tableData[0]) : [];
  }

  deleteRow(data){
    this.delete.emit(data);
  }

  editRow(data){
    this.edit.emit(data);
  }

  openElementEvent(data){
    this.openElement.emit(data);
  }

}
