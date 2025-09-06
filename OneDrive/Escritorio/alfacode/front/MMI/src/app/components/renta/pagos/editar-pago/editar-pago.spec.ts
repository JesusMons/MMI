import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPago } from './editar-pago';

describe('EditarPago', () => {
  let component: EditarPago;
  let fixture: ComponentFixture<EditarPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
