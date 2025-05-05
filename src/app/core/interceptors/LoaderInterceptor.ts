import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(
      //timeout(60000),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        (err: any) => {
          this.onEnd();
        }
      )
    );
  }
  private onEnd(): void {
    setTimeout(() => {
      this.hideLoader();
    }, 500);
  }
  private showLoader(): void {
    this.loaderService.MostrarLoader();
  }
  private hideLoader(): void {
    this.loaderService.OcultarLoader();
  }
}
