import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

// Servicios existentes
import { RolService } from '../../../services/rol';
import { RecursoService } from '../../../services/recurso';

// Tipos locales
type Role = { id: number; nombre: string };
type RecursoLite = { id: number; nombre: string; url: string };
type RecursoRolVM = {
  id: number;
  rol: number | Role;
  recurso: number | RecursoLite;
  asignado_en?: string | null;
};

@Component({
  selector: 'app-mostrar-recurso-rol',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, Card, ButtonModule],
  templateUrl: './mostrar-recurso-rol.html',
  styleUrls: ['./mostrar-recurso-rol.css'],
})
export class MostrarRecursoRol implements OnInit {
  // Filtro
  selectedRolId: number | null = null;

  // Datos
  roles: Role[] = [];
  asignaciones: RecursoRolVM[] = [];

  // Recursos (para resolver nombre/url por id)
  recursos: RecursoLite[] = [];
  recursoIndex = new Map<number, RecursoLite>();

  // UI
  loading = false;
  error = '';

  constructor(private rolSvc: RolService, private recursoSvc: RecursoService) {}

  ngOnInit(): void {
    this.cargarRolesYRecursos();
  }

  /** Carga roles y todos los recursos para poder mapear URL por id */
  private cargarRolesYRecursos(): void {
    this.loading = true;
    this.error = '';
    Promise.all([
      this.rolSvc.getAllRoles().toPromise(),
      this.recursoSvc.getAll().toPromise(),
    ])
      .then(([roles, recursos]) => {
        // roles
        this.roles = (roles ?? []).map((r: any) => ({
          id: Number(r.id),
          nombre: r.nombre,
        }));

        // recursos + índice por id
        this.recursos = (recursos ?? []).map((rec: any) => ({
          id: Number(rec.id),
          nombre: rec.nombre,
          url: rec.url,
        }));
        this.recursoIndex.clear();
        this.recursos.forEach(r => this.recursoIndex.set(r.id, r));
      })
      .catch(err => {
        console.error(err);
        this.error = 'No se pudieron cargar roles/recursos.';
      })
      .finally(() => (this.loading = false));
  }

  buscar(): void {
    if (!this.selectedRolId) {
      this.asignaciones = [];
      return;
    }
    this.loading = true;
    this.error = '';

    this.recursoSvc.getAsignacionesPorRol(this.selectedRolId).subscribe({
      next: (list: any[]) => {
        this.asignaciones = (list ?? []).map((x) => ({
          id: Number(x.id),
          rol:
            typeof x.rol === 'object'
              ? { id: Number(x.rol.id), nombre: x.rol.nombre }
              : Number(x.rol),
          recurso:
            typeof x.recurso === 'object'
              ? {
                  id: Number(x.recurso.id),
                  nombre: x.recurso.nombre,
                  url: x.recurso.url,
                }
              : Number(x.recurso),
          asignado_en: x.asignado_en ?? null,
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.detail || 'No se pudieron cargar los recursos del rol.';
        this.asignaciones = [];
        this.loading = false;
      },
    });
  }

  limpiar(): void {
    this.selectedRolId = null;
    this.asignaciones = [];
    this.error = '';
  }

  // —— helpers de render ——
  rolNombre(row: RecursoRolVM): string {
    if (typeof row.rol === 'object' && row.rol?.nombre) return row.rol.nombre;
    const found = this.roles.find((r) => r.id === (row.rol as number));
    return found ? found.nombre : `Rol #${row.rol}`;
  }

  recursoNombre(row: RecursoRolVM): string {
    if (typeof row.recurso === 'object' && row.recurso?.nombre) return row.recurso.nombre;
    const rec = this.recursoIndex.get(row.recurso as number);
    return rec?.nombre ?? `Recurso #${row.recurso}`;
  }

  recursoUrl(row: RecursoRolVM): string {
    // si viene anidado
    if (typeof row.recurso === 'object' && row.recurso?.url) return row.recurso.url;
    // si viene como id -> buscar en el índice
    const rec = this.recursoIndex.get(row.recurso as number);
    return rec?.url ?? '—';
  }

  fechaAsignado(row: RecursoRolVM): string {
    if (!row.asignado_en) return '—';
    const d = new Date(row.asignado_en);
    return isNaN(d.getTime()) ? '—' : d.toLocaleString();
  }
}
