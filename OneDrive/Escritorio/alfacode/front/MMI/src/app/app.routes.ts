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
import { MostrarUser } from './components/user/mostrar-user/mostrar-user';
import { ActualizarUser } from './components/user/actualizar-user/actualizar-user';
import { MostrarRecurso } from './components/recurso/mostrar-recurso/mostrar-recurso';
import { CrearRecurso } from './components/recurso/crear-recurso/crear-recurso';
import { ActualizarRecurso } from './components/recurso/actualizar-recurso/actualizar-recurso';
import { AsignarRecurso } from './components/recurso/asignar-recurso/asignar-recurso';
import { MostrarRecursoRol } from './components/recurso/mostrar-recurso-rol/mostrar-recurso-rol';
import { MostrarEstado } from './components/renta/estados/mostrar-estado/mostrar-estado';
import { CrearEstado } from './components/renta/estados/crear-estado/crear-estado';
import { EditarEstado } from './components/renta/estados/editar-estado/editar-estado'
import { MostrarTipoPago } from './components/renta/tipos-pago/mostrar-tipo-pago/mostrar-tipo-pago'
import { CrearTipoPago } from './components/renta/tipos-pago/crear-tipo-pago/crear-tipo-pago';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'roles', component: MostrarRolComponent, canActivate: [authGuard] },
    { path: 'roles/crear', component: CrearRol, canActivate: [authGuard] },
    { path: 'roles/edit/:id', component: EditarRol, canActivate: [authGuard] },
    { path: 'roles/asignar-rol', component: AsignarRol, canActivate: [authGuard] },
    { path: 'usuarios', component: MostrarUser, canActivate: [authGuard] },
    { path: 'usuarios/actualizar-user/:id', component: ActualizarUser, canActivate: [authGuard] },
    { path: 'recursos', component: MostrarRecurso, canActivate: [authGuard] },
    { path: 'recursos/crear', component: CrearRecurso, canActivate: [authGuard] },
    { path: 'recursos/actualizar-recurso/:id', component: ActualizarRecurso, canActivate: [authGuard] },
    { path: 'recursos/asignar-recurso', component: AsignarRecurso, canActivate: [authGuard] },
    { path: 'recursos/roles/:rol_id/recursos', component: MostrarRecursoRol, canActivate: [authGuard] },
    { path: 'estados', component: MostrarEstado, canActivate: [authGuard] },
    { path: 'estados/crear', component: CrearEstado, canActivate: [authGuard] },
    { path: 'estados/editar/:id', component: EditarEstado, canActivate: [authGuard] },
    { path: 'tipo-pago', component: MostrarTipoPago, canActivate: [authGuard] },
    { path: 'tipo-pago/crear', component: CrearTipoPago, canActivate: [authGuard] },

];
