import { Component, OnInit } from '@angular/core';

interface Materia {
  id: number;
  key: string;
  name: string;
  capacity: number;
  format: string;
  avenue: string [];
  typeUF: string;
  semester: string;
  initialPeriod: number;
  weeks: number;
}

@Component({
  selector: 'siat-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  columnsToDisplay = [
    'ID', 'CLAVE', 'Nombre', 'Capacidad', 'Formato',
    'Avenida(s)', 'Tipo de UF', 'Semestre', 'Periodo inicial', 'Semanas'];
  materias: Materia [] = [
    {
      id: 1,
      key: 'MA1000',
      name: 'Matemáticas 1',
      capacity: 30,
      format: 'Regular',
      avenue: ['ITC', 'IBT'],
      typeUF: 'Regular',
      semester: '5',
      initialPeriod: 1,
      weeks: 10
    },
    {
      id: 2,
      key: 'FA1000',
      name: 'Física 1',
      capacity: 30,
      format: 'Regular',
      avenue: ['ITC', 'IBT'],
      typeUF: 'Regular',
      semester: '5',
      initialPeriod: 1,
      weeks: 10
    },
    {
      id: 2,
      key: 'TC1000',
      name: 'Estructura de Datos',
      capacity: 30,
      format: 'Regular',
      avenue: ['ITC'],
      typeUF: 'Regular',
      semester: '5',
      initialPeriod: 1,
      weeks: 15
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
