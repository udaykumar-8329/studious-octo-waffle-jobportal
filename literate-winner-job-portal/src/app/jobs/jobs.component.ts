import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationComponent } from '../application/application.component';
import { ViewComponent } from '../application/view/view.component';
import { ApplicationService } from '../services/application.service';
import { JobsService } from '../services/jobs.service';
import { AddComponent } from './add/add.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  role = localStorage.getItem('role');
  Jobs=[];
  loginStatus:Boolean=false;
  constructor(private _router:Router, private _toastrService: ToastrService , private _jobService:JobsService,private _applicationService:ApplicationService, private _dialog:MatDialog) {
    this.getJobsList();
    if(localStorage.getItem('userId')==undefined){
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
    }
  }

  ngOnInit(): void {
  }

  getJobsList(){
    if(this.role=='Candidate'){
      this._jobService.getJobsList().subscribe((res:[]) => {
        console.log(res);
        this.Jobs = res;
      });
    }else if(this.role == 'Recruiter'){
      this._jobService.getJobsList(localStorage.getItem('userId')).subscribe((res:[]) => {
        console.log(res);
        this.Jobs = res;
      });
    }
  }

  openAddJobDialog(){
    this._dialog.open(AddComponent,{
      width: '60%'
    })
  }

  applyFor(jobId,companyName,role){
    console.log(jobId);
    this._applicationService.checkIfAlreadyApplied(jobId).subscribe(res => {
      if(res["applied"]){
        this._toastrService.warning('Already Applied');
      }else{
        let dialogRef = this._dialog.open(ApplicationComponent, {
          width: '40%',
          data: { 'jobId': jobId, 'role': role, 'companyName': companyName}
        });
        dialogRef.afterClosed().subscribe((msg) =>  {
          if(msg){
            this._toastrService.success('Applied Successfully');
          }else{
            this._toastrService.warning('Closed Application');
          }
        });
      }
    });
  }

  ViewApplicants(jobId, jobRole){
    this._router.navigate(['applications'], {queryParams: { 'jobId': jobId, 'jobRole': jobRole} });
  }

}
