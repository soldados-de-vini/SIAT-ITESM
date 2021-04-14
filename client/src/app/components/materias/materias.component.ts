import { Component, OnInit } from '@angular/core';

interface Materia {
  clave: string;
  titulo: string;
  duracion: number;
  periodo: number;
  id: number;
}

@Component({
  selector: 'siat-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  materias: Materia [] = [
    {
      clave: 'MA1000',
      titulo: 'Matemáticas 1',
      duracion: 5,
      periodo: 3,
      id: 1
    },
    {
      clave: 'FA1000',
      titulo: 'Física 1',
      duracion: 10,
      periodo: 2,
      id: 2
    },
    {
      clave: 'TC1000',
      titulo: 'Estructura de Datos',
      duracion: 15,
      periodo: 1,
      id: 3
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
