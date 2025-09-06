import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearUsuarioDto } from '../../models/userI';



export interface HelloResp {
  message?: string;
  detail?: string; // por si viene un error del back
}

@Injectable({
  providedIn: 'root'
})
export class User {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/api/autenticacion/`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(
      `${this.base_path}login/`,
      body,
      { withCredentials: true }   // <— importante
    );
  }

  register(data: CrearUsuarioDto): Observable<any> {
    return this.http.post(`${this.base_path}register/`, data);
  }

  helloFromCookie(): Observable<HelloResp> {
    return this.http.get<HelloResp>(
      `${this.base_path}hello/`,
      { withCredentials: true }   // IMPORTANTE para que viaje la cookie
    );
  }

  // src/app/services/user.ts

  logout(): Observable<any> {
    return this.http.post(
      `${this.base_path}logout/`,
      {},                          // el body puede ir vacío
      { withCredentials: true }    // clave para enviar las cookies
    );
  }

}
