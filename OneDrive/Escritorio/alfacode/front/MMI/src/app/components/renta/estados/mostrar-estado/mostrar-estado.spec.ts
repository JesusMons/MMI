import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEstado } from './mostrar-estado';

describe('MostrarEstado', () => {
  let component: MostrarEstado;
  let fixture: ComponentFixture<MostrarEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEstado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEstado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
