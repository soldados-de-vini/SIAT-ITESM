import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [AuthService, ApiService, NzMessageService, Overlay]
    });
    service = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to login', () => {
    const userDummy = {
      email: 'test@gmail.com',
      password: 'pass123'
    };
    service.login(userDummy, () => {});

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Successful login'
      },
      result: {
        access_token: 'token'
      }
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/auth/login'
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
    expect(okResponse.result.access_token).toBeDefined();
  });

  it('should fail on bad parameters', () => {
    const userDummy = {
      email: 'test@gmail.com',
      password: 'wrong password'
    };
    service.login(userDummy, () => {});

    const invalid = {
      status: {
        statusCode: 401,
        message: 'Invalid credentials'
      }
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/auth/login'
    });

    request.flush(invalid);

    expect(invalid.status.statusCode).toBe(401);
  });
});
