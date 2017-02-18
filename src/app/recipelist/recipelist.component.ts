import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {
  public recipelist;
  private id;

    public filesrc;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.getrecipelist();
      this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";
  }

  getrecipelist(){
    var link = 'http://184.168.146.185:1001/recipe-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.recipelist = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  delConfirm(id){
    this.id = id;
  }

  admindel(){
    var link = 'http://184.168.146.185:1001/recipe-del';
    var data = {id:this.id};

    this._http.post(link, data)
        .subscribe(res => {
          this.recipelist();
        }, error => {
          console.log("Oooops!");
        });
  }

}
