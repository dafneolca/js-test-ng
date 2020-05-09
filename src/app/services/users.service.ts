import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'https://reqres.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/api/users`);
  }

  getUser(id) {
    return this.http.get(`${this.apiUrl}/api/users/${id}`);
  }

  addUser(user: IUser) {
    console.log(user);
    return this.http.post(`${this.apiUrl}/api/users`, user);
  }

  deleteUser(id) {
    console.log(id);
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }
}
