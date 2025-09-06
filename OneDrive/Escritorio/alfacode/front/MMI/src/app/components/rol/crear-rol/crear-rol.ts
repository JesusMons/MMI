import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { RolService } from '../../../services/rol'; // 👈 nombre real del archivo

@Component({
  selector: 'app-crear-rol',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, ButtonModule],
  templateUrl: './crear-rol.html',
  styleUrls: ['./crear-rol.css'],
})
export class CrearRol {
  loading = false;
  error = '';

  private fb = inject(NonNullableFormBuilder);
  private rolService = inject(RolService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.maxLength(255)]],
  });

  get f() { return this.form.controls; }

  save(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const payload = this.form.getRawValue();   // {nombre:string, descripcion:string}
    this.rolService.createRol(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/roles']);      // volver a la lista
      },
      error: (err) => {
        this.loading = false;
        console.error('crear rol error:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo crear el rol. Revisa los datos o tus permisos.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }
}
