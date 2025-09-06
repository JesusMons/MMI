// src/app/services/assign-rol.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Usuario {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;

  promedio?: number | null;
  disponibilidad: boolean;
}
export interface UsuarioRol {
  id: number;
  usuario: number;
  rol: number;
  asignado_en: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioRolService {
  // 🔹 Base de la API
  private api_uri_django = 'http://localhost:8000';

  // 🔹 Endpoints
  private usuarios_path = `${this.api_uri_django}/usuarios/`;
  private roles_path = `${this.api_uri_django}/api/autenticacion/roles/`;

  constructor(private http: HttpClient) { }

  /** Listar usuarios */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(this.usuarios_path, { withCredentials: true }).pipe(
      map((res) => res.results ?? res) // ✅ soporta formato paginado {results:[]} o lista directa
    );
  }

  /** Listar roles */
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.roles_path, { withCredentials: true });
  }

  /** Asignar rol a un usuario */
  // assign-rol.service.ts
  asignarRol(usuario_id: number, rol_id: number) {
    return this.http.post(
      `${this.roles_path}asignar-rol/`,
      { usuario: Number(usuario_id), rol: Number(rol_id) }, // 👈 nombres correctos
      { withCredentials: true }
    );
  }

  listarAsignaciones(): Observable<UsuarioRol[]> {
  // Ajusta el path a como lo tengas en el backend:
  // - Si expusiste ListAPIView en /roles/usuario-roles/
  // - O si /roles/asignar-rol/ acepta GET
  return this.http.get<UsuarioRol[]>(
    `${this.roles_path}usuario-roles/`,     // <-- cambia si tu ruta es otra
    { withCredentials: true }
  );
}

}
