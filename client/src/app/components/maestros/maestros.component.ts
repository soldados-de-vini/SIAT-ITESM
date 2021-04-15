import { Component, OnInit } from '@angular/core';
import { Maestro } from 'src/app/models/maestro.model';


@Component({
  selector: 'siat-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {

  columnsToDisplay = ['Nombre', 'Nomina', 'Coordinación', 'Área', 'Email', 'Límite de carga', 'ID'];
  maestros: Maestro[] = [
    {
      name: 'Gerardo Salinas',
      nomina: 'Matematico',
      coordination: 'Matemáticas 1',
      area: ['Matemáticas'],
      email: 'gsalinas@tec.mx',
      loadlimit: 0,
      id: 1
    },
    {
      name: 'Guillermo Rivas',
      nomina: 'Físico',
      coordination: 'Física 1',
      area: ['Física'],
      email: 'grivas@tec.mx',
      loadlimit: 0,
      id: 2
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
