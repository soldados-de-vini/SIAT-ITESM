import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Avenue } from 'src/app/models/avenue.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-avenue',
  templateUrl: './compose-avenue.component.html',
  styleUrls: ['./compose-avenue.component.scss']
})
export class ComposeAvenueComponent implements OnInit {

  @Input() avenue: Avenue;
  @Input() isEditing: boolean;
  public loading: boolean;
  public avenueForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.avenue) {
      this.createFormWithAvenue();
    } else {
      this.createForm();
    }
  }

  private createForm(){
    this.avenueForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  private createFormWithAvenue(){
    this.avenueForm = this.formBuilder.group({
      name: [this.avenue.name, [Validators.required]],
    });
  }

  public cancel(){
    this.nzModalRef.destroy();
  }

  public saveAvenue(){
    if (this.isEditing){
      this.editAvenue();
    } else {
      this.createAvenue();
    }
  }

  private createAvenue(){
    this.loading = true;
    this.apiService.post('/avenues', {avenues: [this.avenueForm.value.name]}).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          this.nzMessageService.success('Avenida creada con éxito');
          this.nzModalRef.destroy({avenue: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al crear la avenida');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear la avenida');
      }
    );
  }

  private editAvenue(){
    this.loading = true;
    this.apiService.put(`/avenues/${this.avenue.id}`, this.avenueForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Avenida editada con éxito');
          this.nzModalRef.destroy({avenue: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar la avenida');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar la avenida');
      }
    );
  }

}
