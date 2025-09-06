import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRecurso } from './asignar-recurso';

describe('AsignarRecurso', () => {
  let component: AsignarRecurso;
  let fixture: ComponentFixture<AsignarRecurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarRecurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarRecurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
