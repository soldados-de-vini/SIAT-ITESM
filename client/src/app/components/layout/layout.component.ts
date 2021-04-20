import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'siat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void{
    this.authService.logout();
  }

}
