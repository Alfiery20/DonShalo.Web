import { CanActivateChildFn } from '@angular/router';

export const authorizeGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
