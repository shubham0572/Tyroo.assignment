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
  selector: 'home-app',
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {
	nameFormControl = new FormControl('', [
	    Validators.required,
	]);
	companyFormControl = new FormControl('', [
	    Validators.required,
	]);
    rule1FormControl = new FormControl('', [
        Validators.required,
    ]);
    formulaFormControl = new FormControl('', [
        Validators.required,
    ]);
    valueFormControl = new FormControl('', [
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
    rules = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private globals: Globals,
    ) {}


    ngOnInit() {
       this.getRules(); 
    }

    public getRules(){
        this.loading = true;
        this.authenticationService.getRules(this.globals.root_url)
        .pipe(first())
        .subscribe(
            data => {
                if(data.code == 1000){
                    this.rules = data.rules;
                }
                else{
                    this.isErrorLogin = true;
                    this.loading = false;
                }
            },
            error => {
                this.isErrorLogin = true;
                this.loading = false;
            }
        );
    }

    public addRule() {
        this.submitted = true;
        /* stop here if form is invalid */
        if (this.nameFormControl.value == '' || this.companyFormControl.value == '' || this.rule1FormControl.value == '' || this.formulaFormControl.value == ''|| this.valueFormControl.value == '') {
            this.isErrorLogin = false;
            return false;
        }
        else{
            this.loading = true;
            this.authenticationService.addRule(this.globals.root_url, this.nameFormControl.value, this.companyFormControl.value, this.rule1FormControl.value, this.formulaFormControl.value, this.valueFormControl.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.code == 1000){
                        this.rules = data.rules;
                    }
                    else{
                        this.isErrorLogin = true;
                        this.loading = false;
                    }
                },
                error => {
                    this.isErrorLogin = true;
                    this.loading = false;
                }
            );
        }
    }
}

