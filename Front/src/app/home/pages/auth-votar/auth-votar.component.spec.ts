import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVotarComponent } from './auth-votar.component';

describe('AuthVotarComponent', () => {
  let component: AuthVotarComponent;
  let fixture: ComponentFixture<AuthVotarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthVotarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthVotarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
