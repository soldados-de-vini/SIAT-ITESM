import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd';
import { Period } from 'src/app/models/period.model';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'siat-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {

  public id: string;
  public period: Period;
  public loading: boolean;
  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private nzMessageService: NzMessageService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id){
      this.loading = true;
      this.getPeriod();
      this.getUserId();
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

  public getUserId(){
    const token = this.storageService.getProperty(environment.TOKEN_KEY);
    const jwtHelper = new JwtHelperService();
    this.userId = jwtHelper.decodeToken(token).id;
  }

  public exportTec20(){
    this.apiService.get(`/export/tec20/${this.userId}/period/${this.period.id}`, 'blob').subscribe((res) => {
      console.log(res);
    });
  }

  public exportTec21(){
    this.apiService.get(`/export/tec21/${this.userId}/period/${this.period.id}`).subscribe((res) => {

    });
  }
}
