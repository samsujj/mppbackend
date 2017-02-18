import {Component, OnInit, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Ng2UploaderService} from "ng2-uploader/src/services/ng2-uploader";

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css'],
  providers:[Ng2UploaderService]
})
export class AddrecipeComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  public recipecat;
  private foodimage;

  private userid;
  private userdata2;
  private userdata:CookieService;

  uploadedfilesrc:any;
  private zone: NgZone;
  public basicOptions: Object;
  private progress: number = 0;
  private response: any = {};

  public ingredients;
  public ingredientsId;

  public foodlist;
  public filesrc;

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
    this.ingredients = [];
    this.ingredientsId = [];

    this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

    this.dataForm = this.fb.group({
      receipename: ["", Validators.required],
      descripttion: [""],
      preptime: ["", Validators.required],
      cooktime: ["", Validators.required],
      yields: ["", Validators.required],
      servingsize: ["1", Validators.required],
      servingtype: ["serving", Validators.required],
      category: ["", Validators.required],
      dishtype: ["0"],
      isbreakfast: [0],
      isoneserving: [0],
      leftovers: [0],
      ingrediens: [""]
    });

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://184.168.146.185:1001/uploads'
    };


    this.getFoodcatdetails();
    this.getfoodlist();
  }

  initDirection() {
    return this.fb.group({
      dir: ['', Validators.required]
    });
  }

  addDirection() {
    // add address to the list
    const control = <FormArray>this.dataForm.controls['direction'];
    control.push(this.initDirection());
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

  getFoodcatdetails(){
    var link = 'http://184.168.146.185:1001/foodcat-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.recipecat = result.res;
        }, error => {
          console.log("Oooops!");
        });
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

  cngChkval(ev){
    console.log(ev);
  }

  dosubmit(formval){

    let isbreakfast = 0;
    let isoneserving = 0;
    let leftovers = 0;

    if(formval.isbreakfast){
      isbreakfast = 1;
    }
    if(formval.isoneserving){
      isoneserving = 1;
    }
    if(formval.leftovers){
      leftovers = 1;
    }


    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://184.168.146.185:1001/add-recipe';
      var data = {receipename: formval.receipename,descripttion: formval.descripttion,preptime: formval.preptime,cooktime: formval.cooktime,yields: formval.yields,servingsize: formval.servingsize,servingtype: formval.servingtype,category:formval.category,dishtype: formval.dishtype,isbreakfast: isbreakfast,isoneserving:isoneserving,leftovers: leftovers,ingrediens: this.ingredientsId,direction:[],userid:this.userid,is_custom:0,calories:0,image:this.foodimage};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/recipe-list']);
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

  addFood(item){

    var idx = this.foodlist.indexOf(item);

    this.foodlist.splice(idx,1);

    this.ingredients.push(item);
    this.ingredientsId.push(item._id);

  }


}
