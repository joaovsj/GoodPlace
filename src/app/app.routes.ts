import { Routes } from '@angular/router';
import { checkGuard } from './shared/guards/check.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/signup/signup.component')
    },
    {
        path: 'explore', 
        loadComponent: () => import('./pages/explore/explore.component'),
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/person/person.routes').then(rout => rout.personRoutes),
        // canMatch: [checkGuard]
    },
    {
        path: '**', 
        loadComponent: () => import('./pages/not-found/not-found.component')
    }
];
