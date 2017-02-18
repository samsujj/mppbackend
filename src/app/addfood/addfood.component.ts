import { Component, NgZone, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Ng2UploaderService} from "ng2-uploader/src/services/ng2-uploader";
//import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css'],
  providers:[Ng2UploaderService]
})
export class AddfoodComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  public foodcategories;
  private foodimage;

  private userid;
  private userdata2;
  private userdata:CookieService;

  uploadedfilesrc:any;
  private zone: NgZone;
  public basicOptions: Object;
  private progress: number = 0;
  private response: any = {};


  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;

    this.userdata2  = userdata.getObject('userdetails');

    if(typeof (this.userdata2) != 'undefined'){
      this.userid = this.userdata2._id;
    }
  }

  ngOnInit() {
    this.isSubmit = false;
    this.foodimage = '';

    this.dataForm = this.fb.group({
      foodname: ["", Validators.required],
      descripttion: [""],
      calories: ["", Validators.required],
      carbs: ["", Validators.required],
      fat: ["", Validators.required],
      protein: ["", Validators.required],
      type: [""],
      price: ["", Validators.required],
      servingsize: ["1", Validators.required],
      servingtype: ["serving", Validators.required],
    });


    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://184.168.146.185:1001/uploads'
    };

  }


  haserrorcls(cntrlname){

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname){

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  dosubmit(formval){


    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://184.168.146.185:1001/add-food';
      var data = {foodname: formval.foodname,descripttion: formval.descripttion,calories: formval.calories,carbs: formval.carbs,fat: formval.fat,protein: formval.protein,price: formval.price,servingsize: formval.servingsize,servingtype: formval.servingtype,image:this.foodimage,userid:this.userid,type:formval.type,is_custom:0};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/food-list']);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

  handleUpload(data: any): void
  {

    //console.log(data.progress.percent);
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent ;
      if(data.progress.percent==100){

        if(typeof (data.response)!='undefined') {
            var datres = JSON.parse(data.response);

          if(datres.error_code == 0){
            this.foodimage = datres.filename;
            this.uploadedfilesrc = "http://184.168.146.185/~mealplant/node_server/uploads/" + this.foodimage;
          }
        }
      }
    });
  }


}
