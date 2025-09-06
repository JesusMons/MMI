import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRentaProducto } from './crear-renta-producto';

describe('CrearRentaProducto', () => {
  let component: CrearRentaProducto;
  let fixture: ComponentFixture<CrearRentaProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRentaProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRentaProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
