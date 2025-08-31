import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterDto {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  promedio: number | null;
  disponibilidad: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class User {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/api/autenticacion/`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.base_path}login/`, body);
  }

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.base_path}register/`, data);
  }
}
