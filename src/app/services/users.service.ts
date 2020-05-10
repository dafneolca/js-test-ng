import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { IUser } from '../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'https://reqres.in';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Origin': '*'
  };

  pages: number;

  constructor(private http: HttpClient) {}

  // DOUBLE CHECK OBSERVABLE RETURN
  addUser(user: IUser): Observable<any> {
    console.log(user);
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

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/api/users`).pipe(
      tap(res => res),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/api/users/${id}`);
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

  // updateArticle(article: Article): Observable<number> {
  //   let httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.put<Article>(this.articleUrl + "/" + article.id, article, {
  //     headers: httpHeaders,
  //     observe: 'response'
  //   }
  //   ).pipe(
  //     map(res => res.status),
  //     catchError(this.handleError)
  //   );
  // }

  // TODO: CHECK
  deleteUser(id: number): Observable<number> {
    console.log('id: ', id);
    return this.http.delete<number>(`${this.apiUrl}/api/users/${id}`).pipe(
      tap(status => {
        console.log(status);
        return status;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
