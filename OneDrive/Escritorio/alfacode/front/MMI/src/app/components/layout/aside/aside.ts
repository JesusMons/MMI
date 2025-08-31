import { Component , OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside implements OnInit{
  items: MenuItem[] | undefined;
  ngOnInit() {
        this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes',
        items: [
          {
            label: 'Crud Cliente'
          },
          {
            label: 'HTML 2'
          }
        ]
      },
      {
        label: 'Tipo Productos',
        icon: 'pi pi-fw pi-qrcode',
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-shopping-bag',
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-shopping-cart',
      }

    ];
    }
}
