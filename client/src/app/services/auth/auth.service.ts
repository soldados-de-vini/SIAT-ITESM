import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageService
  ) { }

  /**
   * Login using an email and a password
   *
   * @param user user that is performing the log in
   */
  public login(user: User, callback: any): void{
    this.apiService.post('/auth/login', {email: user.email, password: user.password}).subscribe(
      (response) => {
        if (response.status.statusCode === 202 && response.result?.access_token) {
          this.apiService.setAccessToken(response.result.access_token);
          this.storageService.setProperty(environment.TOKEN_KEY, response.result.access_token);
          this.router.navigate(['/']);
          callback({loading: false});
        } else if (response.status.statusCode === 401){
          callback({loading: false});
          // TODO show toast with message
        }
      },
      (error) => {
        callback({loading: false});
        console.error('There was an error at the login, ', error);
      }
    );
  }
}
