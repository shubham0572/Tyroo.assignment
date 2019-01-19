import { Injectable }                    from '@angular/core';
import { HttpHeaders, HttpClient }       from '@angular/common/http';
import { Router, ActivatedRoute }        from '@angular/router';

import { Observable, throwError }        from 'rxjs';
import { catchError, retry, map }        from 'rxjs/operators';

const httpOptions = {     
    headers: new HttpHeaders({        
        'Content-Type':  'application/json;charset=utf-8',    
    })    
};

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ){}

    login(rootUrl:string, username: string, passw: string):Observable<any> {
        return this.http.post<any>(rootUrl+'user/login', {username:username, password:passw}, httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }

    addRule(rootUrl:string, name: string, company: string, rule1:string, formula:string, value:string):Observable<any> {
        return this.http.post<any>(rootUrl+'user/addrule', {name:name, company:company, rule1:rule1, formula:formula, value:value}, httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }
    
    getRules(rootUrl:string):Observable<any> {
        return this.http.post<any>(rootUrl+'user/getrule', {}, httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }

    logout(rootUrl:string) {
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
    }

}