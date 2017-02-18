import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userdata:CookieService;

  constructor(private router: Router,userdata:CookieService) {
    let userdata2 = userdata.getObject('userdetails');


    if(typeof (userdata2) == 'undefined'){
      this.router.navigateByUrl('/login');
    }

  }

  ngOnInit() {
  }

}
