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
  salones: Array<Salon>;

  constructor() { }

  ngOnInit(): void {
  }

}
