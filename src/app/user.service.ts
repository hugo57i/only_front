import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    let body = new URLSearchParams();
    body.set('user', JSON.stringify(user));
    return this.http.post<User>("https://projetzigbackbdd.herokuapp.com/users/register", body.toString(), { headers: 
    { 'content-type': 'application/x-www-form-urlencoded' }, observe: 'response' });
  } 

  login(login: string, motDePasse: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('login', login);
    body.set('password', motDePasse);
    return this.http.post<Object>("https://projetzigbackbdd.herokuapp.com/users/login", body.toString(), { headers: 
    { 'content-type': 'application/x-www-form-urlencoded' }, observe: 'response' });
  } 
}
