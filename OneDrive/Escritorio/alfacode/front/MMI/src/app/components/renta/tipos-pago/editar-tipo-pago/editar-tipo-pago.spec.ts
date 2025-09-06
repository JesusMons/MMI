import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoPago } from './editar-tipo-pago';

describe('EditarTipoPago', () => {
  let component: EditarTipoPago;
  let fixture: ComponentFixture<EditarTipoPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoPago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
