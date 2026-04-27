import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HistoryEventDialog } from '../../components/history-event-dialog/history-event-dialog';
import { WeranionEvent, WeranionHistory } from '../../models/history.models';
import { Month, WeranionDate } from '../../models/utils.models';
import { DialogService } from '../../services/dialog.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  imports: [
    NgClass,
    CdkDrag,
    DragDropModule,
    MatIconModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class HistoryPage implements OnInit, AfterViewInit {
  currentDate: WeranionDate = {
    year: 1,
    month: 5
  };

  histories: WeranionHistory[] = [];

  timeLine: WeranionDate[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  editMode !: boolean; 

  currentHistory!: WeranionHistory;
  selectedEvent!: WeranionEvent;

  /** Constructor of HystoryPage
   *
   * @param historyService Handle Weranion history
   * @param dialogService
   */
  constructor(
    private historyService: HistoryService,
    private dialogService: DialogService,
  ) {}

  /** HystoryPage init */
  ngOnInit(): void {
    this.createTimeLine();
    this.historyService.getHistories().subscribe(histories => {
      console.log(histories);
      this.histories = histories;
      this.histories.map(history => {
        const time = this.timeLine.find(time => time.year === history.year && time.month === history.month);
        if (time) {
          time.eventTitle = history.title;
        }
      });
    });
  }

  /** HystoryPage after view init */
  ngAfterViewInit(): void {
    this.scrollToRight();
  }

  /** Call after the init of the page to set the timeline to the right */
  scrollToRight(): void {
    const el = this.scrollContainer.nativeElement;
    el.scrollLeft = el.scrollWidth;
  }

  /** Create the time line object */
  createTimeLine(): void {
    let year = 0;
    while (year < this.currentDate.year) {
      for (let month = 1; month <= 12; month++) { 
        this.timeLine.push({
          year,
          month: month as Month
        });
      } 
      year++;
    }

    for (let month = 1; month <= this.currentDate.month; month++) {
      this.timeLine.push({
        year,
        month: month as Month
      });
    }
  }

  /**
   *
   * @param time
   */
  selectMonth(time: WeranionDate){
    this.currentHistory = this.histories.find(history => time.year === history.year && time.month === history.month) ?? this.histories[0];
    this.selectedEvent = this.currentHistory?.events?.[0];
  }

  /**
   *
   * @param event
   */
  selectEvent(event: WeranionEvent): void {
    this.selectedEvent = event;
  }

  /**
   *
   * @param event
   */
  test(event: CdkDragDrop<string[]>): void {
    console.log(8, event);
    moveItemInArray(this.currentHistory.events, event.previousIndex, event.currentIndex);
  } 
  
  /** Switch between read and edit mode */
  switchEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   *
   */ 
  addEvent() {
    this.dialogService.openDialog<HistoryEventDialog, WeranionEvent>({
      component: HistoryEventDialog
    }).afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.currentHistory.events.push(result);
        this.updateHistory(this.currentHistory);
      }
    });
  }

  /**
   *
   * @param event
   */
  deleteEvent(event) {
    console.log(event);
  }

  /**
   *
   * @param history
   */
  updateHistory(history: WeranionHistory): void {
    this.historyService.updateHistory(history).subscribe();
  }
}
