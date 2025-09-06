import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRenta } from './editar-renta';

describe('EditarRenta', () => {
  let component: EditarRenta;
  let fixture: ComponentFixture<EditarRenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
