import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillostComponent } from './detaillost.component';

describe('DetaillostComponent', () => {
  let component: DetaillostComponent;
  let fixture: ComponentFixture<DetaillostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
