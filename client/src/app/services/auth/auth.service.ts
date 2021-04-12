import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user.model';

const TOKEN_KEY = 'token';

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
  public login(user: User): void{
    this.apiService.post('/auth/login', {email: user.email, password: user.password}).subscribe(
      (response) => {
        if (response.status.statusCode === 201 && response.result?.access_token) {
          this.apiService.setAccessToken(response.result.access_token);
          this.storageService.setProperty(TOKEN_KEY, response.result.access_token);
          this.router.navigate(['/']);
        } else if (response.status.statusCode === 401){
          // TODO show toast with message
        }
      },
      (error) => {
        console.error('There was an error at the login, ', error);
      }
    );
  }
}
