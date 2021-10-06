import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private _http:HttpClient) { }

  addJob(jobData){
    return this._http.post(environment.apiBaseUrl+'job/add',jobData);
  }

  getJobsList(postedBy?){
    if(postedBy){
      return this._http.get(environment.apiBaseUrl+'job/all/'+postedBy);
    }else{
      return this._http.get(environment.apiBaseUrl+'job/all');
    }
  }

}
