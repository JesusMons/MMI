import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

type HelloRes = {
  message?: string;            // ej: "Hola, ker, estas autenticado <3"
  username?: string;           // por si el backend lo envía directo
  user?: { username?: string } // o anidado
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
}
