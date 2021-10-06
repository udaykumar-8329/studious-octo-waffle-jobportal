import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  jobForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,private _toastrService: ToastrService, private _jobService: JobsService, private _dialogRef: MatDialogRef<AddComponent>) {

  }

  ngOnInit(): void {
    this.jobForm = this._formBuilder.group({
      code: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      minSalary: ['', [Validators.required]],
      jobDescription:  ['', [Validators.required]],
      role:  ['', [Validators.required]],
      postedBy:  ['', [Validators.required]]
    });
  }

  addJob(){
    var jobData = this.jobForm.value;
    jobData["postedBy"] = localStorage.getItem('userId');
    this._jobService.addJob(jobData).subscribe((res)=>{
      console.log(jobData);
      console.log(res);
      if(res['status']){
        this._dialogRef.close({status: true});
        this._toastrService.success('Job Added Successfully');
      }else{
        this._toastrService.success('Something error Occured, please try again');
      }
    });
  }
}
