import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateRegistrationComponent implements OnInit {

  errors = {
    deptError: false,
    yearError: false,
    rollNumberError: false
  };

  candidateRegistrationForm: FormGroup;

  constructor(private _dialogRef:MatDialogRef<CandidateRegistrationComponent>, private _toastrService: ToastrService, private _formBuilder: FormBuilder, private _authService: AuthService, private _dialog:MatDialog) {
    this.candidateRegistrationForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      isRecruiter: [ false ],
      companyName: ['']
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.candidateRegistrationForm.value);
  }

  register(){
    console.log(this.candidateRegistrationForm.value);
    this._authService.register(this.candidateRegistrationForm.value).subscribe((res)=>{
      console.log(res);
      if(res['status']){
        this._dialogRef.close({status: true});
      }else{
        this._toastrService.error( res['data']['message'],'Registered Successfully');
      }
    })
  }

  goToLogin(){
    this._dialogRef.close({status: false, 'openLogin': true});
  }

}
