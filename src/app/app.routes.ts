import { Routes } from '@angular/router';
import { authorizeGuard } from './core/guards/authorize.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./public/public.module').then((m) => m.PublicModule),
    },
    {
        path: 'intranet',
        loadChildren: () =>
            import('./private/private.module').then((m) => m.PrivateModule),
    },
    {
        path: '**',
        redirectTo: 'public',
    },
];
