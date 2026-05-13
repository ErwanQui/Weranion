import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barony } from './barony';

describe('Barony', () => {
  let component: Barony;
  let fixture: ComponentFixture<Barony>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barony],
    }).compileComponents();

    fixture = TestBed.createComponent(Barony);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
