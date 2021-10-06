import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _router: Router, private _dialogRef: MatDialogRef<CandidateLoginComponent>, private _formBuilder: FormBuilder, private _authService: AuthService, private _toasterService: ToastrService ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      isRecruiter:[false]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this._authService.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
        if(res["status"]){
          this._dialogRef.close({status: true});
          this._toasterService.success('Login Success');
          this._authService.setUserInfo(res);
          this._router.navigate(['jobs']);
        }
      else{
        console.log(res);
        this._toasterService.error(res["data"]["message"],'Login Error');
      }
    });
  }

  goToRegister(){
    this._dialogRef.close({ status:false, 'openRegistration': true });
  }
}
