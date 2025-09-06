import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';

// PrimeNG (standalone en Angular 20)
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { EstadoService } from '../../../../services/renta/estados';

@Component({
  selector: 'app-editar-estado',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, ButtonModule],
  templateUrl: './editar-estado.html',
  styleUrls: ['./editar-estado.css']
})
export class EditarEstado implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private estadoSvc = inject(EstadoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id!: number;
  loading = false;
  error = '';

  form = this.fb.group({
    esta_nombre: ['', [Validators.required, Validators.maxLength(45)]],
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    // Obtiene el :id de la ruta
    const raw = this.route.snapshot.paramMap.get('id');
    this.id = Number(raw);
    if (!this.id) {
      this.error = 'ID inválido.';
      return;
    }
    this.cargar();
  }

  private cargar(): void {
    this.loading = true;
    this.error = '';
    this.estadoSvc.get(this.id).subscribe({
      next: (data: any) => {
        // Ajusta al nombre del campo exacto que devuelve tu API: { esta_id?, esta_nombre }
        this.form.patchValue({
          esta_nombre: data?.esta_nombre ?? ''
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estado:', err);
        this.error = err?.error?.detail || 'No se pudo cargar el estado.';
        this.loading = false;
      }
    });
  }

  save(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const payload = this.form.getRawValue(); // { esta_nombre: string }
    this.estadoSvc.update(this.id, payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/estados']); // vuelve al listado
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al actualizar estado:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo actualizar el estado. Revisa los datos o tus permisos.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/estados']);
  }
}
