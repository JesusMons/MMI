import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';   // 👈 importar esto
import { User } from '../../services/auth'; 
import { Aside } from '../layout/aside/aside';
import { Footer } from '../layout/footer/footer';
import { Header } from '../layout/header/header';
import { Content } from '../layout/content/content';

type HelloRes = {
  message?: string;
  username?: string;
  user?: { username?: string };
  detail?: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Aside, Footer, Header, Content], // 👈 agregar RouterOutlet
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  loading = false;
  message = '';
  error = '';

  constructor(private userService: User) {}

  checkAuth(): void {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.userService.helloFromCookie().subscribe({
      next: (res: HelloRes) => {
        this.loading = false;
        this.message =
          res.message ||
          `Hola, ${res.username || res.user?.username || 'usuario'}!`;
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.detail ||
          'No se encontró sesión activa o el token es inválido';
      }
    });
  }
}
