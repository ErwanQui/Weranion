import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuchyComponent } from './duchy';

describe('Duchy', () => {
  let component: DuchyComponent;
  let fixture: ComponentFixture<DuchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuchyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DuchyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
