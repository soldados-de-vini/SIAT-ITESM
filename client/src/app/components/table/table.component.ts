import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'siat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() openElement = new EventEmitter<any>();
  @Input() tableData: Array<any>;
  @Input() columns: Array<any>;
  @Input() hasActions = true;
  @Input() hasSearchBar = true;
  @Input() loading: boolean;
  @Input() hasOpenButton: boolean;
  dataCopy: any;
  searchValue: any;
  sortFunction: any;

  constructor() { }

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    this.dataCopy = this.tableData;
  }

  customSortFunction(e, prop){
    if (e === 'ascend' || e === null){
      this.tableData.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }else if (e === 'descend'){
      this.tableData.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
    }
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

  search(){
    const filteredResults = this.dataCopy.filter((data) =>
      JSON.stringify(data).toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
    this.tableData = filteredResults;
  }

}
