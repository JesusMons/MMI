import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRecursoRol } from './mostrar-recurso-rol';

describe('MostrarRecursoRol', () => {
  let component: MostrarRecursoRol;
  let fixture: ComponentFixture<MostrarRecursoRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRecursoRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRecursoRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
