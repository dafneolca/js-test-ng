import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { IUser } from '../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'https://reqres.in';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getPageSettings() {
    return this.http.get<any>(`${this.apiUrl}/api/users`).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/api/users/${id}`);
  }

  getUsers(page: number): Observable<IUser[]> {
    return this.http.get<any>(`${this.apiUrl}/api/users?page=${page}`).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  addUser(user: IUser): Observable<any> {
    return this.http
      .post<IUser>(`${this.apiUrl}/api/users`, user, {
        headers: this.httpHeaders,
        observe: 'response'
      })
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  updateUser(user: IUser) {
    return this.http
      .put<IUser>(`${this.apiUrl}/api/users/${user['id']}`, user, {
        headers: this.httpHeaders,
        observe: 'response'
      })
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/api/users/${id}`, {
        observe: 'response'
      })
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
