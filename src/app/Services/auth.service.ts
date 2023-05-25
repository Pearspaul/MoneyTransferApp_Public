import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7202/api/User/"
  private userPayload:any;
  constructor(private http : HttpClient,private route:Router) { 
    this.userPayload=this.decodeTheToken();
  }

  signUp(userobj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userobj)

  }

  login(loginobj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginobj)
  }

  signout(){
    localStorage.clear();//localStorage.removeItem('token');
    this.route.navigate(["login"]);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  storeRefreshToken(tokenValue:string){
    localStorage.setItem('refreshToken',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  decodeTheToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
  getEmailFromStore(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  getUserIdFromStore(){
    if(this.userPayload)
    return this.userPayload.UserId;
  }
  getAdminEmailFromStore(){
    if(this.userPayload)
    return this.userPayload.AdminEmail;
  }

  renewToken(tokenApi : TokenApiModel)
  {return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)}
}

