import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbRatingComponent } from './ngb-rating.component';

describe('NgbRatingComponent', () => {
  let component: NgbRatingComponent;
  let fixture: ComponentFixture<NgbRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
