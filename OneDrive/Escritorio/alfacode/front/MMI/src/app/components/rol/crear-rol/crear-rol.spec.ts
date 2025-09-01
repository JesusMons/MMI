import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRol } from './crear-rol';

describe('CrearRol', () => {
  let component: CrearRol;
  let fixture: ComponentFixture<CrearRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
