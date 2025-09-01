// src/app/services/rol.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  id?: number;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private api_uri_django = 'http://localhost:8000';
  private base_path = `${this.api_uri_django}/api/autenticacion/`;

  constructor(private http: HttpClient) {}

  /** Listar todos los roles */
  getAllRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.base_path}roles/`, { withCredentials: true });
  }

  /** Crear rol */
  createRol(data: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.base_path}roles/crear/`, data, { withCredentials: true });
  }

  /** Obtener rol por id */
  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.base_path}roles/${id}/`, { withCredentials: true });
  }

  /** Actualizar rol */
  updateRol(id: number, data: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.base_path}roles/${id}/`, data, { withCredentials: true });
  }

  /** Eliminar rol */
  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_path}roles/${id}/`, { withCredentials: true });
  }
}
