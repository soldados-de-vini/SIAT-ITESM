import { Component, OnInit } from '@angular/core';

interface Salon {
  clave: string;
  edificio: string;
  piso: number;
  atributo: string;
  id: number;
}

@Component({
  selector: 'siat-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss']
})
export class SalonesComponent implements OnInit {

  salones: Salon [] = [
    {
      clave: 'EIC-402',
      edificio: 'EIAD',
      piso: 4,
      atributo: 'Laboratorio de Física',
      id: 1
    },
    {
      clave: 'B-123',
      edificio: '3',
      piso: 3,
      atributo: 'Salon de bloque',
      id: 2
    },
    {
      clave: 'EIC-402',
      edificio: '3',
      piso: 3,
      atributo: 'Default',
      id: 3
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
