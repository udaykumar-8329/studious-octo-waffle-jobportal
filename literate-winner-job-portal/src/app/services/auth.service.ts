import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserInfo : {};

  constructor(private _http:HttpClient) { }

  register(registrationData){
    // console.log(registrationData);
    return this._http.post(environment.apiBaseUrl+ 'register', registrationData)
  }

  login(loginData){
    console.log(loginData);
    return this._http.post(environment.apiBaseUrl+'login', loginData);
  }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('token', (user["token"]));
    localStorage.setItem('role', user["role"]);
    localStorage.setItem('userId',user["userId"]);
  }

}
