import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet name="header"></router-outlet><div class="page-content"><div class="row" style="margin-top: 0; min-height: 500px;"><router-outlet name="left"></router-outlet><router-outlet></router-outlet></div></div><router-outlet name="footer"></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works :) !';
}
