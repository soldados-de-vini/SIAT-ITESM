import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private router: Router,
    private storageService: StorageService,
    private nzMessageService: NzMessageService
  ) { }

  /**
   * Logout from the application deleting the token from localstorage and returning to login
   */
  public logout(): void{
    this.eventService.publish('user:loggedout');
    this.storageService.removeProperty(environment.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Login using an email and a password
   *
   * @param user user that is performing the log in
   */
  public login(user: User, callback: any): void{
    console.log('sending test');
    this.apiService.post('/auth/login', {email: user.email, password: user.password}).subscribe(
      (response) => {
        console.log(response);
        if (response.status.statusCode === 200 && response.result?.access_token) {
          this.apiService.setAccessToken(response.result.access_token);
          this.storageService.setProperty(environment.TOKEN_KEY, response.result.access_token);
          this.router.navigate(['/dashboard/periodos']);
          callback({loading: false});
          this.nzMessageService.success('Bienvenido a SIAT');
        } else if (response.status.statusCode === 401){
          this.nzMessageService.error('Ocurrió un error, intena más tarde');
          callback({loading: false});
        } else {
          this.nzMessageService.error('Ocurrió un error, intena más tarde');
          callback({loading: false});
        }
      },
      (error) => {
        callback({loading: false});
        this.nzMessageService.error('Ocurrió un error, intena más tarde');
        console.error('There was an error at the login, ', error);
      }
    );
  }
}
