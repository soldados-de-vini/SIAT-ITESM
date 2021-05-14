import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-groups21',
  templateUrl: './groups21.component.html',
  styleUrls: ['./groups21.component.scss']
})
export class Groups21Component implements OnInit {

  // tslint:disable-next-line: variable-name
  private _periodId: string;

  @Input() set periodId(value: string) {
    this._periodId = value;
    this.getGroups21();
 }
  public groups;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getGroups21();
  }

  private getGroups21() {
    this.apiService.get(`/groups21/period/${this._periodId}`).subscribe(
      (response) => {
        if (response.status?.statusCode === 200){
          this.groups = response.result;
        } else {
          this.nzMessageService.error('Error al cargar grupos Tec 21');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar grupos Tec 21');
        console.log('Error al cargar grupos Tec 21', error);
      }
    );
  }
}
