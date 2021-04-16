import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'siat-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  columnsToDisplay = [
    'ID', 'CLAVE', 'Nombre', 'Capacidad', 'Semestre',
    'Semana inicial', 'Semanas', 'Avenida(s)', 'Tipo', 'Modulos'];
  materias: Array<Materia> = []

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(): void{
    this.api.get('/courses').subscribe((res) => {
      this.materias = res.result;
      console.log(res)
    })
  }

}
