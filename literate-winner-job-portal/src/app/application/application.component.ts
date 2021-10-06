import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { ApplicationService } from '../services/application.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

class Resume {
  file: File;
  uploadProgress: string;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  resumes;
  uploading: Boolean;
  filePath: String;
  candidateApplicationForm: FormGroup;

  constructor(private _http: HttpClient, private _dialogRef: MatDialogRef<ApplicationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private _toastrService: ToastrService, private _applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.candidateApplicationForm = this._formBuilder.group({
      jobId: [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      resume: [''],
      userId: ['']
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.resumes = file;
    }
  }

  onResumeSubmit() {
    this.filePath = null;
    const formData = new FormData();
    formData.append('file', this.resumes);
    // const token = localStorage.getItem('token');
    let postheaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'content-type': 'application/json', 'Authorization' : `Bearer ${localStorage.getItem('token')}` }  )
    this._http.post<any>(environment.apiBaseUrl+'file/upload', formData, {headers: postheaders} ).subscribe(
      (res) => {
        console.log(res);
        this.filePath = res["path"]
      },
      (err) => console.log(err)
    );
  }

  submitApplication() {
    console.log(this.data);
    this._applicationService.checkIfAlreadyApplied(this.data.jobId).subscribe(res => {
      if (!res['applied']) {
        console.log(res);
        // if (this.filePath) {
          var applicationData = this.candidateApplicationForm.value;
          applicationData.resume = this.filePath;
          applicationData.jobId = this.data.jobId;
          applicationData.userId = localStorage.getItem('userId');
          this._applicationService.submitApplication(applicationData).subscribe((res) => {
            console.log(res);
            if (res['status']) {
              this._dialogRef.close({'applied': true});
            } else {
              this._toastrService.error(res['data']['message'], 'Something error occured')
            }
          });
        // } else {
        //   alert('Upload a resume');
        // }
      } else {
        this._toastrService.error('Already Applied');
      }
    })
  }
}
