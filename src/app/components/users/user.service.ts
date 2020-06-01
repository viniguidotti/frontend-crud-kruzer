import { User } from './user.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:3000/users/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user)
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user)
  }

  delete(_id) {
    return this.http.delete(this.baseUrl + _id)
  }

  async read() {
    return this.http.get(this.baseUrl).toPromise().catch((err) => Promise.reject(err))
  }
}
