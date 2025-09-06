import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRentaProducto } from './editar-renta-producto';

describe('EditarRentaProducto', () => {
  let component: EditarRentaProducto;
  let fixture: ComponentFixture<EditarRentaProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRentaProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRentaProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
