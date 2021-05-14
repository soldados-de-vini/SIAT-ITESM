import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Period } from 'src/app/models/period.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {

  public id: string;
  public period: Period;
  public loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id){
      this.loading = true;
      this.getPeriod();
    }
  }

  private getPeriod(){
    this.apiService.get(`/periods/${this.id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.period = response.result;
        } else {
          this.nzMessageService.error('Error al cargar periodo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar periodo');
        console.log('Error al cargar periodo', error);
      }
    );
  }

  public onBack(): void{
    this.location.back();
  }
}
