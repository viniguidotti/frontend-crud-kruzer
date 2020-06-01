import { HttpClient } from '@angular/common/http';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {

  baseUrl = "http://localhost:3000/users/"

  users: any
  displayedColumns = ['buttons', '_id', 'name', 'email', 'createdAt']

  constructor(private userService: UserService, private http: HttpClient,
  private router: Router) {}

  async ngOnInit() {
      this.users = await this.userService.read()
      console.log(this.users)
  }
 
  deleteUser(_id) {
    this.userService.delete(_id).subscribe();
    this.userService.showMessage('Usuário deletado');
    this.router.navigate(['/users']);
  }

  cancel(): void {
    this.router.navigate([self])
  }

}