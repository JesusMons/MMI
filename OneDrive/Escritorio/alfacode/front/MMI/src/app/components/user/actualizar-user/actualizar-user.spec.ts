import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUser } from './actualizar-user';

describe('ActualizarUser', () => {
  let component: ActualizarUser;
  let fixture: ComponentFixture<ActualizarUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
