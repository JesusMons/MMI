import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';

// PrimeNG 20
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

import { UsuariosService, Usuario } from '../../../services/user';

@Component({
  selector: 'app-actualizar-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, ButtonModule, RouterLink],
  templateUrl: './actualizar-user.html',
  styleUrls: ['./actualizar-user.css']
})
export class ActualizarUser implements OnInit {
  loading = false;
  error = '';
  usuarioId!: number;

  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UsuariosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(150)]],
    first_name: [''],
    last_name: [''],
    email: ['', [Validators.email]]
    // Si NO actualizas password aquí, no lo incluyas.
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    // Lee el :id de la ruta y carga el usuario
    const idParam = this.route.snapshot.paramMap.get('id');
    this.usuarioId = Number(idParam);
    if (!this.usuarioId) {
      this.error = 'ID de usuario inválido.';
      return;
    }
    this.cargarUsuario(this.usuarioId);
  }

  private cargarUsuario(id: number): void {
    this.loading = true;
    this.error = '';
    this.userService.obtener(id).subscribe({
      next: (u: Usuario) => {
        this.form.reset({
          username: u.username ?? '',
          first_name: u.first_name ?? '',
          last_name: u.last_name ?? '',
          email: u.email ?? ''
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
        this.error = err?.error?.detail || 'No se pudo cargar el usuario.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = this.form.getRawValue();

    this.userService.actualizar(this.usuarioId, payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Usuario actualizado correctamente.');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo actualizar el usuario.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
