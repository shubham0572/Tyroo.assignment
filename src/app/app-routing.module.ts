import { NgModule }             		  	from '@angular/core';
import { RouterModule, Routes } 		  	from '@angular/router';

import { AuthGuard } from './_guards';

import { LoginComponent }      			  	from './login/login.component';
import { HomeComponent }      			  	from './home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}