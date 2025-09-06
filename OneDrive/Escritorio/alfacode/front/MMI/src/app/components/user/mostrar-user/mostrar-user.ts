import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

// Tu servicio
import { UsuariosService, Usuario } from '../../../services/user';

@Component({
  selector: 'app-mostrar-user',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, Card, ButtonModule],
  templateUrl: './mostrar-user.html',
  styleUrls: ['./mostrar-user.css']
})
export class MostrarUser implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error = '';

  constructor(private userService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = '';
    this.userService.listar().subscribe({
      next: (data) => {
        this.usuarios = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.error = err?.error?.detail || 'No se pudieron cargar los usuarios';
        this.loading = false;
      }
    });
  }

  rolesDe(u: Usuario): string {
    if (!u?.roles?.length) return '—';
    const nombres = Array.from(new Set(u.roles.map(r => r?.nombre).filter(Boolean)));
    return nombres.length ? nombres.join(', ') : '—';
  }

  eliminarUsuario(id: number): void {
    if (!id) return;
    const ok = confirm('¿Seguro que deseas eliminar este usuario?');
    if (!ok) return;

    this.loading = true;
    this.userService.eliminar(id).subscribe({
      next: () => {
        // Quitar de la lista en memoria sin recargar
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.loading = false;
        alert('Usuario eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar usuario', err);
        this.loading = false;
        this.error =
          err?.error?.detail ||
          'No se pudo eliminar el usuario. Verifica permisos o intenta de nuevo.';
      }
    });
  }

  trackById(_: number, item: Usuario) {
    return item.id;
  }
}
