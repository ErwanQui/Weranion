import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEventDialog } from './history-event-dialog';

describe('HistoryEventDialog', () => {
  let component: HistoryEventDialog;
  let fixture: ComponentFixture<HistoryEventDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryEventDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryEventDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
