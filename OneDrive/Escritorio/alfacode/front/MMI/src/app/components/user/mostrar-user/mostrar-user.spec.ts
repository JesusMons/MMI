import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUser } from './mostrar-user';

describe('MostrarUser', () => {
  let component: MostrarUser;
  let fixture: ComponentFixture<MostrarUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
