import { Component, OnInit } from '@angular/core';

interface Modulo {
  clave: string;
  titulo: string;
  duracion: number;
  id: number;
}

@Component({
  selector: 'siat-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

  modulos: Modulo [] = [
    {
      clave: 'MA1000',
      titulo: 'Matemáticas 1',
      duracion: 5,
      id: 1
    },
    {
      clave: 'FA1000',
      titulo: 'Física 1',
      duracion: 10,
      id: 2
    },
    {
      clave: 'TC1000',
      titulo: 'Estructura de Datos',
      duracion: 15,
      id: 3
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
