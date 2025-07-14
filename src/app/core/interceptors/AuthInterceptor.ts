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
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private localService: LocalStorageService,
        private dialog: MatDialog
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        console.log("PRUEBA INTERCEPTOR")
        console.log("PASO POR AQUI MI LOCO")

        return next.handle(req).pipe(
            catchError((error) => {
                console.log("HAY ERROR???",error)
                if (error.status === 401) {
                    // Cierra todos los dialogos si estan abiertos
                    this.dialog.closeAll();
                    this.localService.clear();
                    this.router.navigate(['']);
                }
                return throwError(() => error);
            })
        );
    }
}
