import { Component, OnInit } from '@angular/core';

interface Bloque {
  clave: string;
  titulo: string;
  modulos: string [];
  id: number;
}

@Component({
  selector: 'siat-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.scss']
})
export class BloquesComponent implements OnInit {

  bloques: Bloque [] = [
    {
      clave: 'BITC',
      titulo: 'Bloque ITC',
      modulos: ['Matemáticas 1, Programación, Programación, Reto, Física'],
      id: 1
    },
    {
      clave: 'BIBT',
      titulo: 'Bloque IBT',
      modulos: ['Física 1, Química, Matemáticas 1, Programación, Reto'],
      id: 2
    },
    {
      clave: 'BIMT',
      titulo: 'Bloque IMT',
      modulos: ['Física 1, Física 1, Matemáticas 1, Programación, Reto'],
      id: 2
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
