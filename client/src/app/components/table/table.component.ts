import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'siat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  selectedData;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Input() tableData: [];
  @Input() columns: [];

  constructor() { }

  ngOnInit(): void {
    this.selectedData = this.tableData;
  }

  getKeys(){
    return (this.selectedData && this.selectedData.length > 0) ?  Object.keys(this.selectedData[0]) : [];
  }

  deleteRow(id){
    this.delete.emit(id);
  }

  editRow(id){
    this.edit.emit(id);
  }

}