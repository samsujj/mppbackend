import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editfoodcat',
  templateUrl: './editfoodcat.component.html',
  styleUrls: ['./editfoodcat.component.css']
})
export class EditfoodcatComponent implements OnInit {
  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  private id;

  constructor(fb: FormBuilder,private _http: Http,private router: Router, private route: ActivatedRoute) {
    this.fb = fb;
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUserdetails();
    },error=>{
      this.router.navigate(['/admin-list']);
    });

    this.isSubmit = false;

    this.dataForm = this.fb.group({
      catname: ["", Validators.required],
      description: [""],
    });
  }

  haserrorcls(cntrlname){
    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname,type='reuired'){
    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  getUserdetails(){
    var link = 'http://184.168.146.185:1001/foodcat-details';
    var data = {_id : this.id};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if(result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['catname']).setValue(userdet.name);
            (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
          }else{
            this.router.navigate(['/recipe-category-list']);
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  dosubmit(formval){
    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://184.168.146.185:1001/edit-foodcat';
      var data = {name: formval.catname,description: formval.description,id: this.id};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/recipe-category-list']);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
