import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstado } from './crear-estado';

describe('CrearEstado', () => {
  let component: CrearEstado;
  let fixture: ComponentFixture<CrearEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEstado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEstado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
