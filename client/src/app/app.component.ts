import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './services/api/api.service';
import { EventService } from './services/event/event.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLogged: boolean;

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private storageService: StorageService,
  ){
    this.eventService.subscribe('user:logged', () => {
      this.isLogged = true;
    });

    this.eventService.subscribe('user:loggedout', () => {
      this.isLogged = false;
    });
  }

  ngOnInit(){
    const token = this.storageService.getProperty(environment.TOKEN_KEY);
    if (token !== null){
      this.apiService.setAccessToken(token);
    }
  }
}
