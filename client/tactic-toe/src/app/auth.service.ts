import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SocketioService } from './socketio.service';
import { dataResponse, response } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private socket: SocketioService) { }
  

  public isLoggedIn = false;

  //does is authenticated url need a /  in front? no idea

  isAuthenticated(){
    let result = false;
    return this.http.get('https://tacticsmellytoes.fly.dev/loggedin', {withCredentials: true}).pipe(
      map(() => {
        this.isLoggedIn = true;
        return true;
      }),
      catchError(() => of(false))
    )
  }

  setUserInfo(user:any) { // TODO: Make use of this
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  validate(email:string, password:string) {
    // {'statusCode': 200, 'message':'logged in', 'user':req.user}
    return this.http.post<dataResponse>('https://tacticsmellytoes.fly.dev/login', {'username': email, 'password': password}, {withCredentials: true});
  }

  register(email:string, firstName:string, lastName:string, password:string) {
    return this.http.post<response>('https://tacticsmellytoes.fly.dev/register', {email, firstName, lastName, password});
  }

  logout() {
    this.isLoggedIn = false;
    this.setUserInfo({});
    this.socket.clearSearchArray()
    this.socket.searching = false
    return this.http.delete<response>('https://tacticsmellytoes.fly.dev/logout', {withCredentials: true});
  }

}
