import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaronyComponent } from './barony';

describe('Barony', () => {
  let component: BaronyComponent;
  let fixture: ComponentFixture<BaronyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaronyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaronyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
