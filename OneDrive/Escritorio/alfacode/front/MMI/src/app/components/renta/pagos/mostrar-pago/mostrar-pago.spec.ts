import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPago } from './mostrar-pago';

describe('MostrarPago', () => {
  let component: MostrarPago;
  let fixture: ComponentFixture<MostrarPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
