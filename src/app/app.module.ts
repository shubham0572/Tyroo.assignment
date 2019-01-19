import { NgModule }        					            from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS} 	        from '@angular/common/http';
import { BrowserModule }   					            from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}              from '@angular/forms';
import { MatNativeDateModule } 				            from '@angular/material';
import { platformBrowserDynamic } 			            from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule }                      from '@angular/platform-browser/animations';

import { SweetAlert2Module }                            from '@toverux/ngx-sweetalert2';
import { NgbModule } 							        from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }                             from './app-routing.module';
import { DemoMaterialModule }                           from './material-module';
import { AppComponent }                                 from './app.component';
import { LoginComponent }                               from './login/login.component';
import { HomeComponent }                                from './home/home.component';


import { AlertComponent }                               from './_directives';
import { AuthGuard }                                    from './_guards';
import { JwtInterceptor, ErrorInterceptor, Globals}     from './_helpers';

import { AlertService, AuthenticationService}              from './_services';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NgbModule,
        SweetAlert2Module.forRoot(),
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
    ],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        Globals,
        AuthGuard,
        AlertService,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
