import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRecurso } from './mostrar-recurso';

describe('MostrarRecurso', () => {
  let component: MostrarRecurso;
  let fixture: ComponentFixture<MostrarRecurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRecurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRecurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
