import { Component, OnInit, Input, Output,EventEmitter, ViewChild } from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Details} from '../details';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  
  @Input() registeredData: Details[]; 
  @Output() editData = new EventEmitter<Details>();
  @Output() deleteData = new EventEmitter<Details>();

  constructor() { 
    this.sortedData = this.registeredData;
  }

  sortedData: Details[];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.registeredData, event.previousIndex, event.currentIndex);
  }
  sortData(sort: Sort) {
    const data = this.registeredData;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(a.username, b.username, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'website': return compare(a.website, b.website, isAsc);
        default: return 0;
      }
    });
  }
  
  ngOnInit() {
  }
  
  onEdit(obj){
    this.editData.emit(obj)
  }
  
  onDelete(obj){
    this.deleteData.emit(obj)
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}