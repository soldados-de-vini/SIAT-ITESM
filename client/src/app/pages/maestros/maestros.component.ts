import { Component, OnInit } from '@angular/core';

interface Maestro {
  nombre: string;
  titulo: string;
  materias: string [];
  area: string;
  id: number;
}

@Component({
  selector: 'siat-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {

  maestros: Maestro[] = [
    {
      nombre: 'Gerardo Salinas',
      titulo: 'Matematico',
      materias: ['Matemáticas 1'],
      area: 'Matemáticas',
      id: 1
    },
    {
      nombre: 'Guillermo Rivas',
      titulo: 'Físico',
      materias: ['Física 1'],
      area: 'Física',
      id: 2
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
