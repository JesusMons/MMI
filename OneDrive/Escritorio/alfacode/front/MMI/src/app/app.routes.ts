import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Aside } from './components/layout/aside/aside';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Header } from './components/layout/header/header';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
];
