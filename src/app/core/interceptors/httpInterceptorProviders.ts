import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./AuthInterceptor";
import { LoaderInterceptor } from "./LoaderInterceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
]
