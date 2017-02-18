import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-foodcatlist',
  templateUrl: './foodcatlist.component.html',
  styleUrls: ['./foodcatlist.component.css']
})
export class FoodcatlistComponent implements OnInit {

  public adminlist;
  private id;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.getFoodCatList();
  }

  getFoodCatList(){
    var link = 'http://184.168.146.185:1001/foodcat-list';
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
    var link = 'http://184.168.146.185:1001/foodcat-del';
    var data = {id:this.id};

    this._http.post(link, data)
        .subscribe(res => {
          this.getFoodCatList();
        }, error => {
          console.log("Oooops!");
        });
  }

}
