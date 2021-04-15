import { Component, OnInit } from '@angular/core';

interface Periodo {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  vacations: Date[];
}

@Component({
  selector: 'siat-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.scss']
})
export class PeriodosComponent implements OnInit {

  columnsToDisplay = ['ID', 'Nombre', 'Fecha de inicio', 'Fecha de fin', 'Vacaciones'];
  periodos: Periodo [] = [
    {
      id: 1,
      name: 'Intento 1',
      startDate: 1,
      endDate: 50,
      vacations: [],
    },
    {
      id: 2,
      name: 'Intento 2',
      startDate: 1,
      endDate: 50,
      vacations: [],
    },
    {
      id: 3,
      name: 'Intento 3',
      startDate: 1,
      endDate: 50,
      vacations: [],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
