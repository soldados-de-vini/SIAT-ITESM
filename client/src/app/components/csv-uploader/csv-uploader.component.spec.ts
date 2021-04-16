import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Overlay } from '@angular/cdk/overlay';

import { CsvUploaderComponent } from './csv-uploader.component';

describe('CsvUploaderComponent', () => {
  let component: CsvUploaderComponent;
  let fixture: ComponentFixture<CsvUploaderComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CsvUploaderComponent],
      providers: [NzMessageService, Overlay]
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should upload new csv to the server', () => {
    const objectToUpload = {
      courses: [
        {
          key: 'MT1',
          name: 'Mate1',
          capacity: 30,
          semester: 'TEC20',
          initialWeek: 6,
          weeks: 10,
          avenue: ['IIC'],
          typeUF: 'TEC21',
        },
        {
          key: 'MT12',
          name: 'Mate2',
          capacity: 30,
          semester: 'TEC20',
          initialWeek: 6,
          weeks: 10,
          avenue: ['IIC'],
          typeUF: 'TEC21',
        },
      ],
    };

    let response;

    const endpoint = '/courses';

    apiService.post(endpoint, objectToUpload).subscribe((res) => {
      response = res;
    });

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Courses successfully created.',
      },
      result: [
        {
          key: 'MT1',
          name: 'Mate1',
          capacity: 30,
          semester: 'TEC20',
          initialWeek: 6,
          weeks: 10,
          avenue: ['IIC'],
          typeUF: 'TEC21',
          id: '4a53d76f-c4a8-41b0-b040-e226f0fb4cb0',
        },
        {
          key: 'MT12',
          name: 'Mate2',
          capacity: 30,
          semester: 'TEC20',
          initialWeek: 6,
          weeks: 10,
          avenue: ['IIC'],
          typeUF: 'TEC21',
          id: 'f8e86d7d-a36a-49a4-bf56-f596ad258ec5',
        },
      ],
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + endpoint,
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
    expect(okResponse.result).toBeDefined();
  });
});
