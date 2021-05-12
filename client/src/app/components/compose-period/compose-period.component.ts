import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Period } from 'src/app/models/period.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-period',
  templateUrl: './compose-period.component.html',
  styleUrls: ['./compose-period.component.scss']
})
export class ComposePeriodComponent implements OnInit {

  @Input() period: Period;
  @Input() isEditing: boolean;
  public loading: boolean;
  public periodForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.period) {
      this.createFormWithPeriod();
    } else {
      this.createForm();
    }
  }

  public createForm() {
    this.periodForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      vacations: [[]]
    });
  }

  public createFormWithPeriod() {
    this.periodForm = this.formBuilder.group({
      name: [this.period.name, Validators.required],
      startDate: [this.period.startDate, Validators.required],
      endDate: [this.period.endDate, Validators.required],
      vacations: [this.period.vacations]
    });
  }

  public cancel(){
    this.nzModalRef.close();
  }

  public savePeriod(){
    if (this.isEditing){
      this.editPeriod();
    } else {
      this.createPeriod();
    }
  }

  private createPeriod(){
    this.loading = true;
    this.apiService.post('/periods', {periods: [this.periodForm.value]}).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          this.nzMessageService.success('Periodo creado con éxito');
          this.nzModalRef.destroy({periods: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al crear el periodo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear el periodo');
      }
    );
  }

  private editPeriod(){
    this.loading = true;
    this.apiService.put(`/periods/${this.period.id}`, this.periodForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Periodo editado con éxito');
          this.nzModalRef.destroy({period: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el periodo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el periodo');
      }
    );
  }
}
