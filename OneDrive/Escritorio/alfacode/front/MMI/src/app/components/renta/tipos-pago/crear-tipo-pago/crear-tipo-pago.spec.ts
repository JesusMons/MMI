import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoPago } from './crear-tipo-pago';

describe('CrearTipoPago', () => {
  let component: CrearTipoPago;
  let fixture: ComponentFixture<CrearTipoPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoPago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
