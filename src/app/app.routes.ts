import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import LoginComponent from './pages/login/login';
import RegisterComponent from './pages/register/register';
import LogoutComponent from './pages/logout/logout';
import MainComponent from './pages/main/main';
import AddComponent from './pages/add/add';
import ProfileComponent from './pages/profile/profile';


/* 
Estos son los paths que usara la aplicacion, basicamente tenemos la pantalla
de login que se mantiene hasta que el usuario se loggea o registra, despues
se mantiene 'main' como la pagina por defecto, o como el path por defecto (**)
*/

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    
    { path: 'main', component: MainComponent },
    { path: 'add', component: AddComponent },
    { path: 'profile', component: ProfileComponent },

    { path: '**', redirectTo: 'login' }
];