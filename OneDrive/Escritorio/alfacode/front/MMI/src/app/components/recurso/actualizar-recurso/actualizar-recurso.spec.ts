import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecurso } from './actualizar-recurso';

describe('ActualizarRecurso', () => {
  let component: ActualizarRecurso;
  let fixture: ComponentFixture<ActualizarRecurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRecurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarRecurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
