import { Routes } from "@angular/router";

export const personRoutes: Routes = [
    {
        path: ':token',
        loadComponent: () => import('./profile/profile.component').then(p => p.ProfileComponent)
    },
    {
        path: 'comment/:idPost',
        loadComponent: () => import('./comment/comment.component').then(p => p.CommentComponent)
    }
]