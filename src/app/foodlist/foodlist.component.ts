import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {DomSanitizer,SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit {
  public foodlist;
  private id;

    public filesrc;

  constructor(private _http: Http,private  sanitizer:DomSanitizer) { }

  ngOnInit() {

      this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

      this.getfoodlist();
  }

  getfoodlist(){
    var link = 'http://184.168.146.185:1001/food-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.foodlist = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  delConfirm(id){
    this.id = id;
  }

  admindel(){
    var link = 'http://184.168.146.185:1001/food-del';
    var data = {id:this.id};

    this._http.post(link, data)
        .subscribe(res => {
          this.getfoodlist();
        }, error => {
          console.log("Oooops!");
        });
  }

    getImgSrc(imgsrc):SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl(this.filesrc+imgsrc);
    }

}
