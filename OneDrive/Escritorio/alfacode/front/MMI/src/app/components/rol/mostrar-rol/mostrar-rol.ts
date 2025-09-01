// src/app/components/rol/mostrar-rol/mostrar-rol.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CrearRolDto } from '../../../../models/userI'
import { RolService } from '../../../services/rol';

@Component({
  selector: 'app-mostrar-rol',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-rol.html',
  styleUrls: ['./mostrar-rol.css']
})
export class MostrarRolComponent implements OnInit {
  public roles: CrearRolDto[] = [];

  constructor(
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarRoles();
  }

  mostrarRoles() {
    this.rolService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
      }
    });
  }

  editarRol(id: number) {
  this.router.navigate(['/roles/editar', id]); // ✅ lleva al componente EditarRol
}


  eliminarRol(id: number) {
  if (confirm('¿Seguro que deseas eliminar este rol?')) {
    this.rolService.deleteRol(id).subscribe({
      next: () => {
        // 🔥 Elimina el rol de la lista sin recargar
        this.roles = this.roles.filter(rol => rol.id !== id);
        alert('Rol eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar rol', err);
        alert('No se pudo eliminar el rol. Revisa tus permisos o intenta de nuevo.');
      }
    });
  }
}

}
