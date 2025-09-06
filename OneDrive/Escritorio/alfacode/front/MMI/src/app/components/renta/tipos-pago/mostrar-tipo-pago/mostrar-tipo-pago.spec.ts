import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoPago } from './mostrar-tipo-pago';

describe('MostrarTipoPago', () => {
  let component: MostrarTipoPago;
  let fixture: ComponentFixture<MostrarTipoPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTipoPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTipoPago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
