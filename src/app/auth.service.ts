import { Injectable } from '@angular/core';
import { CanActivate,Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  canActivate(){
    if(localStorage.getItem("key")=="qdwdwqdq5w7d=="){
      return true;
    }
    else{
      this.router.navigate([""]);
      return false;
    }
  }
  constructor(private router:Router) { }
}
