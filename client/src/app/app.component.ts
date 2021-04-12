import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'siat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;

  ngOnInit(){
    // TODO: Check for token and save it in the headers of the api service
  }
}
