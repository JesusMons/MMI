import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Aside } from './components/layout/aside/aside';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Header } from './components/layout/header/header';
import { Home } from './components/home/home';
import { authGuard } from './auth.guard';
import { MostrarRolComponent } from './components/rol/mostrar-rol/mostrar-rol';
import { CrearRol } from './components/rol/crear-rol/crear-rol';
import { EditarRol } from './components/rol/editar-rol/editar-rol';
import { AsignarRol } from './components/rol/asignar-rol/asignar-rol';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {path: 'roles', component: MostrarRolComponent, canActivate: [authGuard]},
    {path: 'roles/crear', component: CrearRol, canActivate: [authGuard]},
    {path: 'roles/edit/:id', component: EditarRol, canActivate: [authGuard]},
    {path: 'roles/asignar-rol', component: AsignarRol, canActivate: [authGuard]},
];
