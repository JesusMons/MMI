import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, PanelMenuModule, BadgeModule, RippleModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        items: [
          { label: 'Ver', icon: 'pi pi-users', routerLink: 'usuarios/' },
          { label: 'Crear', icon: 'pi pi-inbox', badge: '5', routerLink: 'register/' },
          
        ]
      },
      {
        label: 'Rol',
        icon: 'pi pi-tag',
        items: [
          { label: 'Ver', icon: 'pi pi-chart-line', routerLink: 'roles' },
          { label: 'Crear', icon: 'pi pi-list', badge: '6', routerLink: 'roles/crear/' },
          { label: 'Asignar rol', icon: 'pi pi-user-plus', routerLink: 'roles/asignar-rol/' }
        ]
      },
      {
        label: 'Recursos',
        icon: 'pi pi-folder-plus',
        items: [
          { label: 'Ver recurso', icon: 'pi pi-cog', routerLink: 'recursos/' },
          { label: 'Crear recurso', icon: 'pi pi-shield', routerLink: 'recursos/crear' },
          {label: 'Mostrar asignaciones', icon: 'pi pi-table', routerLink: 'recursos/roles/:rol_id/recursos'},
          { label: 'Asignar recurso', icon: 'pi pi-user-plus', routerLink: 'recursos/asignar-recurso' }
        ]
      },
      {
        label: 'Estados',
        icon: 'pi pi-book',
        items: [
          { label: 'Ver estados', icon: 'pi pi-book', routerLink: 'estados/' },
          { label: 'Crear estado', icon: 'pi pi-bookmark', routerLink: 'estados/crear' }
        ]
      },
      {
        label: 'Tipos de Pago',
        icon: 'pi pi-book',
        items: [
          { label: 'Ver tipos de pago', icon: 'pi pi-book', routerLink: 'tipo-pago/' },
          { label: 'Crear tipos de pago', icon: 'pi pi-bookmark', routerLink: 'tipo-pago/crear/' }
        ]
      }
    ];
  }

  toggleAll() {
    const expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
    return items.map((menuItem) => {
      (menuItem as any).expanded = expanded; // PrimeNG usa expanded en runtime
      if (menuItem.items) {
        menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
    });
  }

  private areAllItemsExpanded(): boolean {
    return this.items.length > 0 && this.items.every((menuItem: any) => menuItem.expanded);
  }
}
