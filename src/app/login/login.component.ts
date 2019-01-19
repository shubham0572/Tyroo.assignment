import { Component, OnInit } 									from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} 	from '@angular/forms';
import {ErrorStateMatcher} 										from '@angular/material/core';

import { Router, ActivatedRoute } 								from '@angular/router';
import { first } 												from 'rxjs/operators';

import { AlertService, AuthenticationService } 					from '../_services';
import { Globals}                                               from '../_helpers';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
	    const isSubmitted = form && form.submitted;
	    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}


@Component({
  selector: 'assessor-login',
  templateUrl: './login.component.html'
})


export class LoginComponent implements OnInit {
	usernameFormControl = new FormControl('', [
	    Validators.required,
	]);
	passwordFormControl = new FormControl('', [
	    Validators.required,
	]);
  	matcher = new MyErrorStateMatcher();

    loading = false;
    submitted = false;
    isErrorLogin = false;
    errorMsg : string;
    returnUrl: string;
    isReset = false;
    isShowPass = true;
    resetMsg : string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private globals: Globals,
    ) {}


    ngOnInit() {
        /* reset login status */
        this.authenticationService.logout(this.globals.root_url);

        /* get return url from route parameters or default to '/' */
        this.returnUrl = '/';
    }

    public onSubmit() {
        this.submitted = true;

        /* stop here if form is invalid */
        if (this.usernameFormControl.value == '' || this.passwordFormControl.value == '') {
            this.isErrorLogin = false;
            return false;
        }
        else{
            this.loading = true;
            this.authenticationService.login(this.globals.root_url, this.usernameFormControl.value, this.passwordFormControl.value)
            .pipe(first())
            .subscribe(
    	        data => {
                    if(data.code == 1000){
                        this.isErrorLogin = false;
                        localStorage.setItem('currentUser', JSON.stringify({id:data.id, user:data.user}));
                        this.router.navigateByUrl('/home');
                    }
                    else{
                        this.isErrorLogin = true;
                        this.errorMsg = 'Invalid username or password !!';
                        this.loading = false;
                    }
    	        },
    	        error => {
                    this.isErrorLogin = true;
                    this.errorMsg = 'Invalid username or password !!';
    	            this.alertService.error(error);
    	            this.loading = false;
    	        }
    	    );
        }
    }
}

