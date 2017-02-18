import {Component, OnInit, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Ng2UploaderService} from "ng2-uploader/src/services/ng2-uploader";

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.css'],
  providers:[Ng2UploaderService]
})
export class EditrecipeComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  private id;
  private recipecat;

  private foodimage;
  uploadedfilesrc:any;
  private zone: NgZone;
  public basicOptions: Object;
  private progress: number = 0;
  private response: any = {};


  public ingredients;
  public ingredientsId;

  public foodlist;
  public filesrc;


  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;
    this.foodimage = '';
  }

  ngOnInit() {
    this.foodimage = '';
    this.ingredients = [];
    this.ingredientsId = [];
    this.foodlist = [];

    this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getrecipedetails();
      this.getFoodcatdetails();
      this.getfoodlist();
    },error=>{
      this.router.navigate(['/recipe-list']);
    });

    this.isSubmit = false;

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
      ingrediens: [""],
      direction: [""],
    });

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://184.168.146.185:1001/uploads'
    };
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

  getrecipedetails(){
    var link = 'http://184.168.146.185:1001/recipe-details';
    var data = {_id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['receipename']).setValue(userdet.receipename);
            (<FormControl>this.dataForm.controls['descripttion']).setValue(userdet.descripttion);
            (<FormControl>this.dataForm.controls['preptime']).setValue(userdet.preptime);
            (<FormControl>this.dataForm.controls['cooktime']).setValue(userdet.cooktime);
            (<FormControl>this.dataForm.controls['yields']).setValue(userdet.yields);
            (<FormControl>this.dataForm.controls['servingsize']).setValue(userdet.servingsize);
            (<FormControl>this.dataForm.controls['servingtype']).setValue(userdet.servingtype);
            (<FormControl>this.dataForm.controls['category']).setValue(userdet.category);
            (<FormControl>this.dataForm.controls['dishtype']).setValue(userdet.dishtype);
            (<FormControl>this.dataForm.controls['isbreakfast']).setValue(userdet.isbreakfast);
            (<FormControl>this.dataForm.controls['isoneserving']).setValue(userdet.isoneserving);
            (<FormControl>this.dataForm.controls['leftovers']).setValue(userdet.leftovers);
            this.foodimage = userdet.image;
            this.uploadedfilesrc = "http://184.168.146.185/~mealplant/node_server/uploads/" + this.foodimage;

            this.ingredientsId = userdet.ingrediens;

            if(this.ingredientsId.length > 0){
              this.getFoods();
              this.getFoodsNotIds();
            }

          }else{
            this.router.navigate(['/recipe-list']);
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  getFoods(){
    var link = 'http://184.168.146.185:1001/foodbyids';
    var data = {foodlist : this.ingredientsId};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

          this.ingredients = result;

        }, error => {
          console.log("Oooops!");
        });
  }

  getFoodsNotIds(){
    var link = 'http://184.168.146.185:1001/foodbynonids';
    var data = {foodlist : this.ingredientsId};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

          this.foodlist = result;

        }, error => {
          console.log(error);
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
      var link = 'http://184.168.146.185:1001/edit-recipe';
      var data = {receipename: formval.receipename,descripttion: formval.descripttion,preptime: formval.preptime,cooktime: formval.cooktime,yields: formval.yields,servingsize: formval.servingsize,servingtype: formval.servingtype,category:formval.category,dishtype: formval.dishtype,isbreakfast: isbreakfast,isoneserving:isoneserving,leftovers: leftovers,id: this.id,image:this.foodimage,ingrediens: this.ingredientsId,direction:[]};


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
