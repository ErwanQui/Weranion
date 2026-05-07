import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryPage } from './territory';

describe('Territory', () => {
  let component: TerritoryPage;
  let fixture: ComponentFixture<TerritoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerritoryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TerritoryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
