import { HttpClient } from '@angular/common/http';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }
}

export class Constants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss`;
}

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {

  baseUrl = "http://localhost:3000/users/"

  users: any
  displayedColumns = ['_id', 'name', 'email', 'createdAt', 'buttons']

  constructor(private userService: UserService, private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute) {}

  async ngOnInit() {
      this.users = await this.userService.read();
  }
 
  deleteUser(_id) {
    this.userService.delete(_id).subscribe(() => {
    this.userService.showMessage('Usuário deletado');
    this.router.navigate(['/users/read']);
  })

}

  cancel(): void {
    this.router.navigate(['/users'])
  }

}