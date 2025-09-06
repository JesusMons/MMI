import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRenta } from './crear-renta';

describe('CrearRenta', () => {
  let component: CrearRenta;
  let fixture: ComponentFixture<CrearRenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
