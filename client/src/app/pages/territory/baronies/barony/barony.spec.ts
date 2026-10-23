import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaronyPage } from './barony';

describe('Barony', () => {
  let component: BaronyPage;
  let fixture: ComponentFixture<BaronyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaronyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BaronyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
