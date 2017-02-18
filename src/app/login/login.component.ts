import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private dataForm:FormGroup;
  private fb;

  private isSubmit;
  private isemailvalidate;
  public is_error;
  public error_msg;

  private userdata:CookieService;
  private userdetails;

  constructor(fb: FormBuilder,private _http: Http,private router: Router,userdata:CookieService) {
    this.fb = fb;
    this.userdata = userdata;
    this.userdetails=this.userdata.getObject('userdetails');

    if(typeof (this.userdetails) != 'undefined'){
      this.router.navigateByUrl('/profile(header:header//left:left//footer:footer)');
    }

  }

  ngOnInit() {
    this.isSubmit = false;
    this.isemailvalidate = false;

    this.dataForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  haserrorcls(cntrlname){
    if(cntrlname == 'email' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid) {
        let emailval = this.dataForm.controls[cntrlname].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailval)) {
          return '';
        } else {
          return 'has-error';
        }
      }
    }

    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return 'has-error';

    return '';
  }

  showerrorcls(cntrlname,type='reuired'){
    if(cntrlname == 'email' && type == 'validemail' && this.isSubmit){
      if(this.dataForm.controls[cntrlname].valid){
        let emailval = this.dataForm.controls[cntrlname].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailval)){
          return 'hide';
        }else{
          return '';
        }
      }else {
        return 'hide';
      }
    }


    if(!this.dataForm.controls[cntrlname].valid && this.isSubmit)
      return '';



    return 'hide';
  }

  dosubmit(formval){

    this.is_error = 0;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.dataForm.controls['email'].value)){
      this.isemailvalidate = true;
    }

    this.isSubmit = true;

    if(this.dataForm.valid && this.isemailvalidate){
      var link = 'http://184.168.146.185:1001/adminlogin';
      var data = {email: formval.email,password: formval.password};


      this._http.post(link, data)
          .subscribe(data => {
            //this.router.navigate(['/admin-list']);

            var data2 = data.json();

            if(data2.status == 'success'){
              this.userdata.putObject('userdetails', data2.item);

              this.router.navigateByUrl('/profile(header:header//left:left//footer:footer)');
            }else{
              this.is_error = 1;
              this.error_msg = data2.msg;
            }

          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
