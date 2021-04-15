import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ''
    }
  };

  constructor(
    private eventService: EventService,
    private http: HttpClient,
  ) { }

  /**
   * Delete authorization token in the headers of the requests
   *
   */
   public deleteAccessToken(): void{
    this.options.headers.Authorization = '';
  }

  /**
   * Set authorization token in the headers of the requests
   *
   * @param token the token that is being set
   */
  public setAccessToken(token: string): void{
    this.options.headers.Authorization = `Bearer ${token}`;
    this.eventService.publish('user:logged');
  }

  /**
   * Perform a get request given an endpoint
   *
   * @param endpoint endpoint to be called
   */
  public get<T>(endpoint: string): Observable<any> {
    return this.http.get(environment.api_url + endpoint, this.options).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a post request given an endpoint
   *
   * @param endpoint endpoint to be called
   * @param body body of the request
   * @param options options to be sent
   */
   public post<T>(endpoint: string, body: any): Observable<any> {
    return this.http.post(environment.api_url + endpoint, body, this.options).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a put request given an endpoint
   *
   * @param endpoint endpoint to be called
   * @param body body of the request
   * @param options options to be sent
   */
   public put<T>(endpoint: string, body: any): Observable<any> {
    return this.http.put(environment.api_url + endpoint, body, this.options).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a delete request given an endpoint
   *
   * @param endpoint endpoint to be called
   */
   public delete<T>(endpoint: string): Observable<any> {
    return this.http.delete(environment.api_url + endpoint, this.options).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error status: ${error.status}, ` + `message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
