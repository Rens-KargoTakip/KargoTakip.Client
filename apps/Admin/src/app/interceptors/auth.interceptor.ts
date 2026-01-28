import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImU0ZTE0NTYyLTg0YWMtNGI4OC04NmQ3LTA4ZGU1ZDg3ZmZhOSIsIm5iZiI6MTc2OTU4NDc3OSwiZXhwIjoxNzY5NjcxMTc5LCJpc3MiOiJPbWVyIFVyZW4iLCJhdWQiOiJPbWVyIFVyZW4ifQ.2bDOMRdd4n5MDAxbN7B9PtnK9pGUu_384KOOxe9UH5Y7CjdD_-ODqvIM2uFuJGqV1vczG4h1d2ZR1Rk0IRuaFg';
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloneReq);
};
