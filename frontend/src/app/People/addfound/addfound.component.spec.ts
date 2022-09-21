import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfoundComponent } from './addfound.component';

describe('AddfoundComponent', () => {
  let component: AddfoundComponent;
  let fixture: ComponentFixture<AddfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
