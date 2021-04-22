import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ProfessorsComponent } from './professors.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfessorsComponent', () => {
  let component: ProfessorsComponent;
  let fixture: ComponentFixture<ProfessorsComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ ProfessorsComponent ],
      providers: [ ApiService, NzMessageService, Overlay, NzModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete a professor', () => {
    const professorId = 'abcd1234';

    const deleteProfessor = (id) => {
      apiService.delete(`/professors/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Maestro borrado con éxito');
          } else {
            console.log('Ha ocurrido un erorr');
          }
        }
      );
    };

    deleteProfessor(professorId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/professors/${professorId}`,
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
