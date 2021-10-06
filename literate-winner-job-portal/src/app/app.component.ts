import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { CandidateLoginComponent } from './auth/login/candidate/candidate.component';
import { CandidateRegistrationComponent } from './auth/registration/candidate/candidate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Domaincer -Job Portal';
  public spinkit = Spinkit;
  loginStatus: Boolean;
  loginRole: String;
  constructor(private _dialog: MatDialog, private _toastrService: ToastrService, private _router: Router){
    if(localStorage.getItem('role')){
      this.loginRole = localStorage.getItem('role')
      this.loginStatus = true;
      this._router.navigate(['jobs']);
    }else{
      this.openLoginDialog();
    }
    if(!localStorage.getItem('userId')){
      this.openLoginDialog();
    }
  }

  ngOnInit(): void {
  }

  // ngAfterContentInit(){
  //   if(localStorage.getItem('userId')){
  //     this.loginStatus = true;
  //     this.loginRole = localStorage.getItem('role');
  //     this._router.navigate(['jobs']);
  //   }else{
  //     this.openLoginDialog();
  //   }
  // }

  openRegistrationDialog(){
    let dialogRef = this._dialog.open(CandidateRegistrationComponent, {
      width:'50%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(msg => {
      if(msg['status']){
        dialogRef.close();
      }else if(msg['openLogin']){
        this.openLoginDialog();
      }
      else{
        this._toastrService.warning('Something error occured', 'Not Successfull');
      }
    });
  }

  openLoginDialog(){
    let dialogRef = this._dialog.open(CandidateLoginComponent, {
      width:'50%',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(msg => {
      console.log(msg);
      if(msg['status']){
        this.loginStatus = true;
        window.location.reload();
      }else if(msg['openRegistration']){
        this.openRegistrationDialog();
      }else{
        console.log('in false statement');
        this.loginStatus = false;
      }
    });
  }

  logout(){
    this.loginStatus = false;
    localStorage.clear();
    this.goTo('home');
    this.openLoginDialog();
  }

  goTo(routeName){
    this._router.navigate([routeName]);
  }
}
