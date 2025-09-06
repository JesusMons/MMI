import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRenta } from './mostrar-renta';

describe('MostrarRenta', () => {
  let component: MostrarRenta;
  let fixture: ComponentFixture<MostrarRenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
