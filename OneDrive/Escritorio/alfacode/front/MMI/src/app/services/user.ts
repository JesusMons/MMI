import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Rol {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  promedio?: number | null;
  disponibilidad?: boolean;
  roles?: Rol[]; // 👈 viene del backend
}

export interface PagedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly base_path = 'http://localhost:8000/usuarios/';

  constructor(private http: HttpClient) {}

  listar(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }): Observable<Usuario[]> {
    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.page_size) httpParams = httpParams.set('page_size', params.page_size);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.ordering) httpParams = httpParams.set('ordering', params.ordering);

    return this.http
      .get<Usuario[] | PagedResponse<Usuario>>(this.base_path, {
        params: httpParams,
        withCredentials: true,
      })
      .pipe(map((res: any) => (Array.isArray(res) ? res : res?.results ?? [])));
  }

  obtener(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base_path}${id}/`, { withCredentials: true });
  }

  /** (Opcional) Actualizar usuario */
  actualizar(id: number, data: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.base_path}${id}/`, data, { withCredentials: true });
  }

  /** (Opcional) Eliminar usuario */
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_path}${id}/`, { withCredentials: true });
  }
}
