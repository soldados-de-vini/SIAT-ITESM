import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Classroom } from 'src/app/models/classroom.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-period-classroom-list',
  templateUrl: './period-classroom-list.component.html',
  styleUrls: ['./period-classroom-list.component.scss']
})
export class PeriodClassroomListComponent implements OnInit {

  public classrooms: Array<Classroom>;
  public loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.get('/classrooms').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.classrooms = response.result;
        } else {
          this.nzMessageService.error('Error al cargar los salones');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar los salones');
        console.log('Error al cargar los salones', error);
      }
    );
  }

  public assignClassroom(classroom: Classroom){
    this.router.navigate(['salon', classroom.id], {relativeTo: this.activatedRoute});
  }
}
