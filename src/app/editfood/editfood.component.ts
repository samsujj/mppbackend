import {Component, OnInit, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Ng2UploaderService} from "ng2-uploader/src/services/ng2-uploader";

@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.css'],
  providers:[Ng2UploaderService]
})
export class EditfoodComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  private foodimage;
  private id;

  uploadedfilesrc:any;
  private zone: NgZone;
  public basicOptions: Object;
  private progress: number = 0;
  private response: any = {};


  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;

    this.foodimage = '';

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getfooddetails();
    },error=>{
      this.router.navigate(['/admin-list']);
    });

    this.isSubmit = false;
    this.foodimage = '';

    this.dataForm = this.fb.group({
      foodname: ["", Validators.required],
      descripttion: [""],
      calories: ["", Validators.required],
      carbs: ["", Validators.required],
      fat: ["", Validators.required],
      protein: ["", Validators.required],
      price: ["", Validators.required],
      servingsize: ["1", Validators.required],
      servingtype: ["serving", Validators.required],
      type: [""],
    });


    this.zone = new NgZone({ enableLongStackTrace: false });
    this.basicOptions = {
      url: 'http://184.168.146.185:1001/uploads'
    };


  }

  getfooddetails(){
    var link = 'http://184.168.146.185:1001/food-details';
    var data = {_id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['foodname']).setValue(userdet.foodname);
            (<FormControl>this.dataForm.controls['descripttion']).setValue(userdet.descripttion);
            (<FormControl>this.dataForm.controls['calories']).setValue(userdet.calories);
            (<FormControl>this.dataForm.controls['carbs']).setValue(userdet.carbs);
            (<FormControl>this.dataForm.controls['fat']).setValue(userdet.fat);
            (<FormControl>this.dataForm.controls['protein']).setValue(userdet.protein);
            (<FormControl>this.dataForm.controls['price']).setValue(userdet.price);
            (<FormControl>this.dataForm.controls['servingsize']).setValue(userdet.servingsize);
            (<FormControl>this.dataForm.controls['servingtype']).setValue(userdet.servingtype);
            (<FormControl>this.dataForm.controls['type']).setValue(userdet.type);

            this.foodimage = userdet.image;
            this.uploadedfilesrc = "http://184.168.146.185/~mealplant/node_server/uploads/" + this.foodimage;

          }else{
            this.router.navigate(['/food-list']);
          }
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


    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://184.168.146.185:1001/edit-food';
      var data = {foodname: formval.foodname,descripttion: formval.descripttion,calories: formval.calories,carbs: formval.carbs,fat: formval.fat,protein: formval.protein,price: formval.price,servingsize: formval.servingsize,servingtype: formval.servingtype,image:this.foodimage,id: this.id,type:formval.type};


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
