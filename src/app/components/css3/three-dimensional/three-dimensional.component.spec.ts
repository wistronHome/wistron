import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionalComponent } from './three-dimensional.component';

describe('ThreeDimensionalComponent', () => {
  let component: ThreeDimensionalComponent;
  let fixture: ComponentFixture<ThreeDimensionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDimensionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
