import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';

import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';

import { RolService } from '../../../services/rol'; // ajusta la ruta si es distinta
import type { Rol } from '../../../services/rol'; // si tienes la interfaz allí

@Component({
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText],
  templateUrl: './editar-rol.html',
  styleUrls: ['./editar-rol.css'],
})
export class EditarRol implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private rolService = inject(RolService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = false;
  error = '';
  id!: number;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.maxLength(255)]],
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) {
      this.error = 'Falta el parámetro id en la ruta.';
      return;
    }
    this.id = Number(paramId);
    this.cargarRol(this.id);
  }

  private cargarRol(id: number): void {
    this.loading = true;
    this.rolService.getRol(id).subscribe({
      next: (rol: Rol) => {
        this.loading = false;
        this.form.patchValue({
          nombre: rol.nombre ?? '',
          descripcion: rol.descripcion ?? '',
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar rol', err);
        this.error = 'No se pudo cargar el rol.';
      },
    });
  }

  actualizar(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload: Rol = this.form.getRawValue();

    this.rolService.updateRol(this.id, payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/roles']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al actualizar rol', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo actualizar el rol. Revisa los datos o tus permisos.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }
}
