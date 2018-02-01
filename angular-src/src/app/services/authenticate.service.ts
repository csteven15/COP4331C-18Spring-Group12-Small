import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Contact } from '../contact';

@Injectable()
export class AuthenticateService {
  authenticateToken: any;
  user: any;
  contact: any;

  constructor(private http:Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authenticateToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/api/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('/user', JSON.stringify(user));
    this.authenticateToken = token;
    this.user = user;
  }

  getContacts() {
    return this.http.get('/api/contacts')
      .map(res => res.json());
  }

  addContact(contact) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/contacts', contact, {headers: headers})
      .map(res => res.json());
  }

  deleteContact(id) {
    return this.http.delete('/api/contacts/' + id)
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
