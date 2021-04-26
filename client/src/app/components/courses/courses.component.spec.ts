import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Overlay } from '@angular/cdk/overlay';
import { ApiService} from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let api: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports: [HttpClientTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        NzModalService,
        Overlay,
        ApiService,
        NzMessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    api = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete a course', () => {
    const courseId = 'abcd1234';
    const deleteCourse = (id) => {
      api.delete(`/courses/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Materia borrado con éxito');
          } else {
            console.log('Ha ocurrido un erorr');
          }
        }
      );
    };
    deleteCourse(courseId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/courses/${courseId}`,
    });

    const successResponse = {
      status: {
        statusCode: 200,
        message: 'Deleted successfully.',
      }
    };

    request.flush(successResponse);

    expect(successResponse.status.statusCode).toBe(200);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
