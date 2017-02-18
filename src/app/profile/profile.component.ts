import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private id;
  private userdetails:any;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.id = '5884a8677d38f9106f423290';
    this.getUserdetails();
  }

  getUserdetails(){
    var link = 'http://184.168.146.185:1001/admin-details';
    var data = {_id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            this.userdetails = result.item;
          }
        }, error => {
          console.log("Oooops!");
        });
  }

}
