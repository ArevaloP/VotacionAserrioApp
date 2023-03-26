import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaodingPanelComponent } from './laoding-panel.component';

describe('LaodingPanelComponent', () => {
  let component: LaodingPanelComponent;
  let fixture: ComponentFixture<LaodingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaodingPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaodingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
