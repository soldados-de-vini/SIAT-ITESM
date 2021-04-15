import { Component, OnInit } from '@angular/core';

interface Modulo {
  name: string;
  id: number;
}

@Component({
  selector: 'siat-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

  columnsToDisplay = ['ID', 'Nombre'];
  modulos: Modulo [] = [
    {
      id: 1,
      name: 'Matemáticas 1'
    },
    {
      id: 2,
      name: 'Física 1'
    },
    {
      id: 3,
      name: 'Estructura de Datos'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
