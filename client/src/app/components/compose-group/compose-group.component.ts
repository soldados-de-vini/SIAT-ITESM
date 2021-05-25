import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Course } from 'src/app/models/course.model';
import { Group20 } from 'src/app/models/group20.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-group',
  templateUrl: './compose-group.component.html',
  styleUrls: ['./compose-group.component.scss'],
})
export class ComposeGroupComponent implements OnInit {
  public groupForm: FormGroup;
  public isLoadingCourses: boolean;
  public loading: boolean;
  public courses: Array<Course>;
  @Input() isEditing: boolean;
  @Input() periodId: string;
  @Input() group: Group20;
  @Input() isTec21: boolean;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.isTec21) {
      this.getBlocks();
    } else {
      this.getCourses();
    }
    if (this.isEditing) {
      this.createFormWithGroup();
    } else {
      this.createForm();
    }
  }

  private getCourses() {
    this.apiService.get('/courses20').subscribe(
      (res) => {
        this.courses = res.result;
      },
      (error) => {
        this.nzMessageService.error('Error al cargar los grupos');
      }
    );
  }

  private getBlocks() {
    this.apiService.get('/courses21').subscribe(
      (res) => {
        this.courses = res.result;
      },
      (error) => {
        this.nzMessageService.error('Error al cargar los grupos');
      }
    );
  }

  private createForm() {
    this.groupForm = this.formBuilder.group({
      courseKey: [null, Validators.required],
      groupsAmount: [null, Validators.required],
    });
  }

  private createFormWithGroup() {
    this.groupForm = this.formBuilder.group({
      courseKey: [this.group.courseKey, Validators.required],
      number: [this.group.number, Validators.required],
      matricula: [this.group.matricula],
      formato: [this.group.formato],
      classroom: [this.group.classroom],
    });
  }

  public saveGroup() {
    if (this.isEditing) {
      this.editGroup();
    } else {
      this.createGroup();
    }
  }

  private createGroup() {
    if (this.isTec21) {
      this.createGroups21();
    } else {
      this.createGroups20();
    }
  }

  private createGroups20(){
    this.loading = true;
    this.apiService
      .post('/groups/', {
        periodId: this.periodId,
        groups: [this.groupForm.value],
      })
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.status?.statusCode === 201) {
            this.nzMessageService.success('Grupo creado con éxito');
            this.nzModalRef.destroy({ groups: response.result });
          } else {
            this.nzMessageService.error('Ocurrió un error al crear el Grupo');
          }
        },
        (error) => {
          this.loading = false;
          this.nzMessageService.error('Ocurrió un error al crear el Grupo');
        }
      );
  }

  private createGroups21(){
    this.loading = true;
    this.apiService
      .post('/groups21/', {
        periodId: this.periodId,
        groups: [this.groupForm.value],
      })
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.status?.statusCode === 201) {
            this.nzMessageService.success('Grupo creado con éxito');
            this.nzModalRef.destroy({ groups: response.result });
          } else {
            this.nzMessageService.error('Ocurrió un error al crear el Grupo');
          }
        },
        (error) => {
          this.loading = false;
          this.nzMessageService.error('Ocurrió un error al crear el Grupo');
        }
      );
  }

  private editGroup() {
    if (this.isTec21) {
      this.editGroup21();
    } else {
      this.editGroup20();
    }
  }

  private editGroup20() {
    this.loading = true;
    const objectToSend = {
      formato: this.groupForm.controls.formato.value,
      matricula: this.groupForm.controls.matricula.value,
      number: this.groupForm.controls.number.value,
    };
    console.log(objectToSend);
    this.apiService.patch(`/groups/${this.group.id}`, objectToSend).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.nzMessageService.success('Grupo editado con éxito');
          this.nzModalRef.destroy({ group: response.result });
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el Grupo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el Grupo');
      }
    );
  }

  private editGroup21() {
    this.loading = true;
    const objectToSend = {
      formato: this.groupForm.controls.formato.value,
      matricula: this.groupForm.controls.matricula.value,
      number: this.groupForm.controls.number.value,
    };
    console.log(objectToSend);
    this.apiService.patch(`/groups21/${this.group.id}`, objectToSend).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.nzMessageService.success('Grupo editado con éxito');
          this.nzModalRef.destroy({ group: response.result });
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el Grupo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el Grupo');
      }
    );
  }

  public cancel() {
    this.nzModalRef.close();
  }
}
