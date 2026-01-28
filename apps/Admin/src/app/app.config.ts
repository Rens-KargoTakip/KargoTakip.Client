import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errInterceptor } from './interceptors/err.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor,errInterceptor])),
    provideExperimentalZonelessChangeDetection(), // standalone api
    DatePipe,
  ],
};
