import { Component, OnInit } from '@angular/core';
import { Bloque } from 'src/app/models/bloque.model';


@Component({
  selector: 'siat-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.scss']
})
export class BloquesComponent implements OnInit {

  columnsToDisplay = [
    'ID', 'Número', 'ID de Curso', 'ID de Periodo', 'Fecha de inicio',
    'Fecha de fin', 'Matrícula'
  ];
  bloques: Bloque [] = [
    {
      id: 1,
      number: 100,
      courseId: 1,
      periodId: 100,
      startDate: 0,
      endDate: 50,
      matricula: 'A01634433'
    },
    {
      id: 2,
      number: 101,
      courseId: 2,
      periodId: 100,
      startDate: 0,
      endDate: 50,
      matricula: 'A01633932'
    },
    {
      id: 3,
      number: 102,
      courseId: 3,
      periodId: 100,
      startDate: 0,
      endDate: 50,
      matricula: 'A01635051'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
