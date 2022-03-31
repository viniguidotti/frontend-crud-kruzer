import { environment } from './../../../environments/environment.prod';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, delay, take, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "https://deploy-user.herokuapp.com/user/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { 
    
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  //Error messages
  errorCreate(e: any): Observable<any> {
    this.showMessage('Erro ao cadastrar, e-mail já existe', true)
    return EMPTY
  }
  errorDelete(e: any): Observable<any> {
    this.showMessage('Erro ao deletar, tente novamente', true)
    return EMPTY
  }

  errorUpdate(e: any): Observable<any> {
    this.showMessage('Erro ao atualziar, tente novamente', true)
    return EMPTY
  }

  errorRead(e: any): Observable<any> {
    this.showMessage('Erro ao listar, tente novamente', true)
    return EMPTY
  }
  
  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map(obj => obj),
      catchError(e => this.errorCreate(e))
    )
  };

  delete(_id) {
    return this.http.delete(this.baseUrl + _id).pipe(
      map(obj => obj),
      catchError(e => this.errorDelete(e))
    )
  };
  

  readById(_id: string): Observable<User> {
    const url = `${this.baseUrl}/${_id}`
    return this.http.get<User>(url)
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user._id}`
    return this.http.put<User>(url, user).pipe(
      map(obj => obj),
      catchError(e => this.errorUpdate(e))
    )
  }

  async read() {
    return this.http.get(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorRead(e))
    ).toPromise().catch((err) => Promise.reject(err))
  }

  
}
