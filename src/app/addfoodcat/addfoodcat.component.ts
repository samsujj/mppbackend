import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-addfoodcat',
  templateUrl: './addfoodcat.component.html',
  styleUrls: ['./addfoodcat.component.css']
})
export class AddfoodcatComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;

  constructor(fb: FormBuilder,private _http: Http,private router: Router) {
    this.fb = fb;
  }

  ngOnInit() {
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

  dosubmit(formval){

    this.isSubmit = true;
    if(this.dataForm.valid){
      var link = 'http://184.168.146.185:1001/add-foodcat';
      var data = {name: formval.catname,description: formval.description};


      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/recipe-category-list']);
          }, error => {
            console.log("Oooops!");
          });
    }
  }


}
