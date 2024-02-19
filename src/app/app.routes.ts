import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(p=> p.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(p=> p.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/signup/signup.component').then(p => p.SignupComponent)
    },
    {
        path: 'explore', 
        loadComponent: () => import('./pages/explore/explore.component').then(p => p.ExploreComponent)
    }
];
