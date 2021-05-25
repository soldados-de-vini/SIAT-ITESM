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
  public remainingGroups: Array<Group20> = [];
  public remainingModules: Array<any> = [];
  public assignedGroups: Array<any> = [];
  public assignedModules: Array<any> = [];
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
    this.getRemainingModules();
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

  private getRemainingModules(){
    this.apiService.get(`/module-groups/period/${this.periodId}/remaining`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.remainingModules = response.result;
        } else {
          this.nzMessageService.error('Error al cargar grupos tec 21');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar grupos tec 21');
        console.log('Error al cargar grupos tec 21', error);
      }
    );
  }

  private getAssignedGroups(){
    this.apiService.get(`/classrooms/${this.classroomId}/period/${this.periodId}/events`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.assignedGroups = response.result.tec20;
          this.assignedModules = response.result.tec21;
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

  public getFlattenedAssignedGroups(){
    let allGroups = [];

    const mappedModules = this.assignedModules?.map((mod) => {
      mod.isModule = true;
      return mod;
    });

    allGroups = [...this.assignedGroups, ...mappedModules];

    return allGroups;
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

  public onGroupAssignment(group: any, isModule = false){
    const modal = this.nzModalService.create({
      nzTitle: isModule ?  `Asignar modulo ${group.module.name} del bloque ${group.group.course21.key }  - Grupo ${group.group.number}` : `Asignar ${group.course.key} - Grupo ${group.number}`,
      nzContent: GroupAssignmentComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {
        periodId: this.periodId,
        classroomId: this.classroomId,
        group,
        isModule
      }
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.events) {
          if (result.isModule) {
            this.deleteRemainingModules(result.events);
            this.assignedModules = [...result.events, ...this.assignedModules];
          } else {
            this.deleteRemainingGroup(result.events);
            this.assignedGroups = [...result.events, ...this.assignedGroups];
          }
        }
      }
    );
  }

  private deleteRemainingModules(events: any){
    for (const event of events) {
      this.remainingModules = this.remainingModules.filter((remainginGroup) => remainginGroup.id !== event.group.id);
    }
  }

  private deleteRemainingGroup(events: any){
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

  public addRemainingModule(event: any){
    this.apiService.delete(`/module-groups/${event.group.id}/event`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.assignedModules = this.assignedModules.filter((assignedModule) => assignedModule.group.id !== event.group.id);
          this.remainingModules.unshift(event.group);
          this.nzMessageService.warning('Grupo devuelto a modulos restantes');
        } else {
          this.nzMessageService.error('Error al devolver grupo a modulos restantes');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al devolver grupo a modulos restantes');
        console.log('Error al devolver grupo a modulos restantes', error);
      });
  }
}
