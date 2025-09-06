import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRentaProducto } from './mostrar-renta-producto';

describe('MostrarRentaProducto', () => {
  let component: MostrarRentaProducto;
  let fixture: ComponentFixture<MostrarRentaProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRentaProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRentaProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
