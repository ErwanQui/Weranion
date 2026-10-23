import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuchyPage } from './duchy';

describe('Duchy', () => {
  let component: DuchyPage;
  let fixture: ComponentFixture<DuchyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuchyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DuchyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
