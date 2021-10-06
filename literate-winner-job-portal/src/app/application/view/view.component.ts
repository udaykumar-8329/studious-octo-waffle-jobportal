import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'
import { ApplicationService } from 'src/app/services/application.service';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  applications=[];
  role:String;

  constructor(private _activatedRoute:ActivatedRoute, private _applicationService:ApplicationService) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    if(this.role=='Recruiter'){
      this._activatedRoute.queryParams.subscribe(params => {
        console.log(params);
        this.role = params['jobRole'];
        this._applicationService.getApplicants(params['jobId']).subscribe((res)=>{
          if(res['status']){
            this.applications = res['data'];
            console.log(this.applications);
          }
        });
      });
    }else{
      this._applicationService.getAllApplications().subscribe((res)=>{
        if(res['status']){
          this.applications = res['data']
        }
      }, (err)=> {
        console.log(err);
      });
    }
  }

  download(location){
    this._applicationService.downloadResume(location).subscribe(
      data => saveAs(data, location.split('\\')[1]),
    error => console.error(error));
  }
}
