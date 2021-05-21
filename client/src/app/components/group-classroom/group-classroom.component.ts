import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Classroom } from 'src/app/models/classroom.model';
import { Group20 } from 'src/app/models/group20.model';
import { ApiService } from 'src/app/services/api/api.service';
import { GroupAssignmentComponent } from '../group-assignment/group-assignment.component';

@Component({
  selector: 'siat-group-classroom',
  templateUrl: './group-classroom.component.html',
  styleUrls: ['./group-classroom.component.scss']
})
export class GroupClassroomComponent implements OnInit {
  private periodId: string;
  private classroomId: string;

  public loading: boolean;
  public remainingGroups: Array<Group20>;
  public assignedGroups: Array<any>;
  public classroom: Classroom;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.periodId = this.activatedRoute.snapshot.params.periodId;
    this.classroomId = this.activatedRoute.snapshot.params.classroomId;

    this.getClassroom();
    this.getAssignedGroups();
    this.getRemainingGroups();
  }

  private getClassroom(){
    this.apiService.get(`/classrooms/${this.classroomId}`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.classroom = response.result;
        } else {
          this.nzMessageService.error('Error al cargar salón');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar salón');
        console.log('Error al cargar salón', error);
      }
    );
  }

  private getAssignedGroups(){
    this.apiService.get(`/classrooms/${this.classroomId}/period/${this.periodId}/events`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.assignedGroups = response.result.tec20;
        } else {
          this.nzMessageService.error('Error al cargar programación del salón');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar programación del salón');
        console.log('Error al cargar programación del salón', error);
      }
    );
  }

  public getDayEvents(weekday: number){
    const array = this.assignedGroups.filter(element => {
      return element.weekDay === weekday;
    });

    return array.sort((a, b) => {
      return b.startTime - a.startTime;
    });
  }

  private getRemainingGroups(){
    this.apiService.get(`/groups/period/${this.periodId}/remaining`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.remainingGroups = response.result;
        } else {
          this.nzMessageService.error('Error al cargar grupos Tec 20');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar grupos Tec 20');
        console.log('Error al cargar grupos Tec 20', error);
      }
    );
  }

  public onBack(){
    this.location.back();
  }

  public onGroupAssignment(group: Group20 | any){
    const modal = this.nzModalService.create({
      nzTitle: `Asignar ${group.course.key} - Grupo ${group.number}`,
      nzContent: GroupAssignmentComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {
        periodId: this.periodId,
        classroomId: this.classroomId,
        group
      }
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result.events) {
          this.deleteRemainingGroup(result.events);
          this.assignedGroups = [...result.events, ...this.assignedGroups];
        }
      }
    );
  }

  public deleteRemainingGroup(events: any){
    for (const event of events) {
      this.remainingGroups = this.remainingGroups.filter((remainginGroup) => remainginGroup.id !== event.group.id);
    }
  }

  public addRemainingGroup(event: any){
    this.apiService.delete(`/groups/${event.group.id}/event`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.assignedGroups = this.assignedGroups.filter((assignedGroup) => assignedGroup.group.id !== event.group.id);
          event.group.courseKey = event.group.course.key;
          this.remainingGroups.unshift(event.group);
          this.nzMessageService.warning('Grupo devuelto a grupos restantes');
        } else {
          this.nzMessageService.error('Error al devolver grupo a grupos restantes');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al devolver grupo a grupos restantes');
        console.log('Error al devolver grupo a grupos restantes', error);
      });
  }
}
