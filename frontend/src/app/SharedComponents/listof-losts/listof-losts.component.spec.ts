import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofLostsComponent } from './listof-losts.component';

describe('ListofLostsComponent', () => {
  let component: ListofLostsComponent;
  let fixture: ComponentFixture<ListofLostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofLostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofLostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
