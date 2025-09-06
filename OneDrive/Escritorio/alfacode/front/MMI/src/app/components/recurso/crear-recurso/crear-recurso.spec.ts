import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecurso } from './crear-recurso';

describe('CrearRecurso', () => {
  let component: CrearRecurso;
  let fixture: ComponentFixture<CrearRecurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRecurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRecurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
