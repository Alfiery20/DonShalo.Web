import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private localService: LocalStorageService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        console.log("PRUEBA INTERCEPTOR")

        return next.handle(req).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    this.localService.clear();
                    this.router.navigate(['']);
                }
                return throwError(() => error);
            })
        );
    }
}
