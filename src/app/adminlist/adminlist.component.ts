import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {

  public adminlist;
    private id;
    private userdata:CookieService;

    public superAdmin;

  constructor(private _http: Http,userdata:CookieService) {
      let userdata2:any = userdata.getObject('userdetails');

      if(typeof (userdata2) != 'undefined'){
          this.superAdmin = userdata2.supradmin;
      }

  }

  ngOnInit() {
    this.getAdminList();
  }

  getAdminList(){
    var link = 'http://184.168.146.185:1001/admin-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.adminlist = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }
    delConfirm(id){
        this.id = id;
    }

    admindel(){
        var link = 'http://184.168.146.185:1001/admin-del';
        var data = {id:this.id};

        this._http.post(link, data)
            .subscribe(res => {
                this.getAdminList();
            }, error => {
                console.log("Oooops!");
            });
   }

}
