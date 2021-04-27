import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Overlay } from '@angular/cdk/overlay';
import { ApiService} from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassroomsComponent } from './classrooms.component';

describe('ClassroomComponent', () => {
  let component: ClassroomsComponent;
  let fixture: ComponentFixture<ClassroomsComponent>;
  let api: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomsComponent ],
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
    fixture = TestBed.createComponent(ClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    api = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete a classroom', () => {
    const classroomId = 'abcd1234';
    const deleteClassroom = (id) => {
      api.delete(`/classrooms/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Salón borrado con éxito');
          } else {
            console.log('Ha ocurrido un erorr');
          }
        }
      );
    };
    deleteClassroom(classroomId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/classrooms/${classroomId}`,
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
