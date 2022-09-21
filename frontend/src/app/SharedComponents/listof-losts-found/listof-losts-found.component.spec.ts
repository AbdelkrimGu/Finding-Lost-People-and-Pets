import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofLostsFoundComponent } from './listof-losts-found.component';

describe('ListofLostsFoundComponent', () => {
  let component: ListofLostsFoundComponent;
  let fixture: ComponentFixture<ListofLostsFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofLostsFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofLostsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
