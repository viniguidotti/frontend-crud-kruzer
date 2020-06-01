import { UserReadComponent } from './components/users/user-read/user-read.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { UserCrudComponent } from './views/user-crud/user-crud.component'

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "users",
  component: UserCrudComponent,
  },
  {
  path: "users/create",
  component: UserCreateComponent,
  },
  {
  path: "users/read",
  component: UserReadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
