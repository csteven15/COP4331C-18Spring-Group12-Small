import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticateService {
  authenticateToken: any;
  user: any;
  contact: any;

  constructor(private http:Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authenticateToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('http://localhost:3000/user', JSON.stringify(user));
    this.authenticateToken = token;
    this.user = user;
  }

  addContact(contact) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/profile', contact, {headers: headers})
      .map(res => res.json());
  }

  logOut() {
    this.authenticateToken = null;
    this.user = null;
    localStorage.clear();
    return false;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authenticateToken = token;
  }

}
