import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImU0ZTE0NTYyLTg0YWMtNGI4OC04NmQ3LTA4ZGU1ZDg3ZmZhOSIsIm5iZiI6MTc2OTY3NjI1NSwiZXhwIjoxNzY5NzYyNjU1LCJpc3MiOiJPbWVyIFVyZW4iLCJhdWQiOiJPbWVyIFVyZW4ifQ.88ptweHtRdqofiHHi-boNW8ig7grkoEQRF4CC8FQjU56_AVU6pCL2S2sdoI6xN1V4vHsyxJxMiyKB2N04pnLlQ';
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloneReq);
};
