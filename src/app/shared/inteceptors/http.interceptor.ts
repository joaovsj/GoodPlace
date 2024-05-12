import { HttpInterceptorFn } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    shareReplay(),          // solve problem of multi cache
    takeUntilDestroyed()    // solve problem of memory leak
  );
};
