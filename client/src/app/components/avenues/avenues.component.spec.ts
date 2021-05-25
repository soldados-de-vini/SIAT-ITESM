import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { environment } from 'src/environments/environment';

import { AvenuesComponent } from './avenues.component';

describe('AvenuesComponent', () => {
  let component: AvenuesComponent;
  let fixture: ComponentFixture<AvenuesComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ AvenuesComponent ],
      providers: [ ApiService, NzMessageService, Overlay, NzModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete an avenue', () => {
    const avenueId = 'abcd1234';

    const deleteAvenue = (id) => {
      apiService.delete(`/avenues/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Avenida borrada con éxito');
          } else {
            console.log('Ha ocurrido un error');
          }
        }
      );
    };

    deleteAvenue(avenueId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/avenues/${avenueId}`,
    });

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Deleted successfully.',
      }
    };

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
  });
});
