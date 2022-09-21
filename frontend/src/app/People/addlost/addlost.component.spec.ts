import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlostComponent } from './addlost.component';

describe('AddlostComponent', () => {
  let component: AddlostComponent;
  let fixture: ComponentFixture<AddlostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
