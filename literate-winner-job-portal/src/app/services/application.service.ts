import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private _http: HttpClient) { }

  submitApplication(application){
    console.log(application);
    return this._http.post(environment.apiBaseUrl+'application', application);
  }

  getApplicants(jobId){
    return this._http.get(environment.apiBaseUrl+'applications/'+jobId)
  }

  checkIfAlreadyApplied(jobId){
    return this._http.get(environment.apiBaseUrl+'applications/'+jobId+'/'+localStorage.getItem('userId'));
  }

  downloadResume(location){
    return this._http.post(environment.apiBaseUrl+'download', { 'location': location},{
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
  });
  }

  getAllApplications(){
    return this._http.get(environment.apiBaseUrl+'application/'+localStorage.getItem('userId'));
  }
}
