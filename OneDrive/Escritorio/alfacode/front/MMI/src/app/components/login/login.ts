import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private userService: User, private router: Router) { }

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Ingresa usuario y contraseña';
      return;
    }
    this.loading = true;
    this.error = '';

    this.userService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']).then(() => {
          window.location.reload();   // 🔥 recarga total de la app
        });
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.detail ||
          err?.error?.message ||
          'Usuario o contraseña incorrectos';
      }
    });

  }
}
