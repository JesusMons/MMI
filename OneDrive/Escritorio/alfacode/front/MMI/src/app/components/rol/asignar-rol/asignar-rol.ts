// src/app/components/rol/asignar-rol/asignar-rol.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

// PrimeNG 20 (standalone)
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { UsuarioRolService, Usuario, Rol } from '../../../services/userrol';

@Component({
  selector: 'app-asignar-rol',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, TableModule],
  templateUrl: './asignar-rol.html',
  styleUrls: ['./asignar-rol.css']
})
export class AsignarRol implements OnInit {
  loading = false;
  error = '';

  usuarios: Usuario[] = [];
  roles: Rol[] = [];

  /** rol seleccionado por usuario: { [userId]: rolId } */
  selectedRole: Record<number, number | null> = {};

  constructor(private svc: UsuarioRolService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      usuarios: this.svc.getUsuarios(),
      roles: this.svc.getRoles(),
    }).subscribe({
      next: ({ usuarios, roles }) => {
        // si tu backend devuelve {results: []}, el servicio debería mapearlo; si no, ajusta aquí
        this.usuarios = usuarios ?? [];
        this.roles = roles ?? [];
        // inicializa selección en null
        this.selectedRole = {};
        for (const u of this.usuarios) this.selectedRole[u.id] = null;
      },
      error: (err) => {
        console.error('Carga usuarios/roles falló', err);
        this.error = 'No se pudieron cargar usuarios/roles.';
      },
      complete: () => (this.loading = false),
    });
  }

  asignar(u: Usuario): void {
  const rolIdRaw = this.selectedRole[u.id];
  const rolId = Number(rolIdRaw);         // 👈 forzar número

  if (!rolId || Number.isNaN(rolId)) {
    alert('Selecciona un rol primero.');
    return;
  }

  this.loading = true;
  this.error = '';

  this.svc.asignarRol(u.id, rolId).subscribe({
    next: () => {
      alert(`Rol asignado a ${u.username} correctamente`);
    },
    error: (err) => {
      console.error('Error al asignar rol', err);
      console.log('Detalle backend:', err?.error); // 👈 ver campos exactos que fallan
      this.error =
        err?.error?.non_field_errors?.join(', ') ||  // por unique_together
        err?.error?.usuario?.join(', ') ||           // si el id de usuario no existe
        err?.error?.rol?.join(', ') ||               // si el id de rol no existe
        err?.error?.detail ||
        'No se pudo asignar el rol.';
    },
    complete: () => (this.loading = false),
  });
}

}
