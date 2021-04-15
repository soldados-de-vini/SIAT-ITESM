import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/models/salon.model';

@Component({
  selector: 'siat-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss']
})
export class SalonesComponent implements OnInit {

  columnsToDisplay = [
    'Salón', 'Edificio', 'Capacidad', 'Comentarios', 'Tipo',
    'Escuela', 'Entrada', 'Division actual', 'Administrador', 'Estatus'
  ];
  salones: Salon [] = [
    {
      classroom: 2208,
      building: '2',
      capacity: 30,
      comments: 'No hay',
      type: 'Regular',
      school: 'Multiuso',
      entrance: 'Regular',
      currentDiv: 'Regular',
      administrator: 'N/A',
      status: 'Disponible',
    },
    {
      classroom: 3101,
      building: '3',
      capacity: 25,
      comments: 'No hay',
      type: 'Regular',
      school: 'Multiuso',
      entrance: 'Regular',
      currentDiv: 'Regular',
      administrator: 'N/A',
      status: 'Disponible',
    },
    {
      classroom: 1104,
      building: '1',
      capacity: 40,
      comments: 'No hay',
      type: 'Regular',
      school: 'Multiuso',
      entrance: 'Regular',
      currentDiv: 'Regular',
      administrator: 'N/A',
      status: 'Disponible',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
