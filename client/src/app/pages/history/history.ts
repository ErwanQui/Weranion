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
  /** The scroll container of the time line */
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  /** The current date of Weranion */
  currentDate: WeranionDate = {
    year: 1,
    month: 5
  };

  /** The Weranion histories */
  histories: WeranionHistory[] = [];

  /** The time line object */
  timeLine: WeranionDate[] = [];

  /** Whether the page is in edit mode */
  editMode !: boolean; 

  /** The selected history */
  currentHistory!: WeranionHistory;

  /** The selected event */
  selectedEvent!: WeranionEvent;

  /** Constructor of HystoryPage
   *
   * @param historyService Handle Weranion history
   * @param dialogService Handle the dialogs
   */
  constructor(
    private historyService: HistoryService,
    private dialogService: DialogService,
  ) {}

  /** HystoryPage init */
  ngOnInit(): void {
    this.createTimeLine();
    this.historyService.getHistories().subscribe(histories => {
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

  /** Select a month in the timeline
   *
   * @param time The Weranion date
   */
  selectMonth(time: WeranionDate): void {
    this.currentHistory = this.histories.find(history => time.year === history.year && time.month === history.month) ?? this.histories[0];
    this.selectedEvent = this.currentHistory?.events?.[0];
  }

  /** Select an event in the current history
   *
   * @param event
   */
  selectEvent(event: WeranionEvent): void {
    this.selectedEvent = event;
  }

  /** Move an event in the month events list
   *
   * @param eventObject The object that contains the previous and current index of the event in the list
   */
  moveAnEventInTheMonth(eventObject: CdkDragDrop<string[]>): void {
    moveItemInArray(this.currentHistory.events, eventObject.previousIndex, eventObject.currentIndex);
    this.updateHistory(this.currentHistory);
  } 
  
  /** Switch between read and edit mode */
  switchEditMode(): void {
    this.editMode = !this.editMode;
  }

  /** Open a dialog to add an event to the current history */ 
  addEvent(): void {
    this.dialogService.openDialog<HistoryEventDialog, WeranionEvent>({
      component: HistoryEventDialog
    }).afterClosed().subscribe(result => {
      if (result) {
        this.currentHistory.events.push(result);
        this.updateHistory(this.currentHistory);
      }
    });
  }

  /** Update an event
   *
   * @param event The event to update
   */
  updateEvent(event: WeranionEvent): void {
    const eventIndex = this.currentHistory.events.findIndex(currentHistoryEvent => currentHistoryEvent.title === event.title);
    this.dialogService.openDialog<HistoryEventDialog, WeranionEvent>({
      component: HistoryEventDialog,
      data: event
    }).afterClosed().subscribe(result => {
      if (result) {
        this.currentHistory.events[eventIndex] = result;
        this.updateHistory(this.currentHistory);
      }
    });
  }

  /** Delete an event from the current history
   *
   * @param event The event to delete
   */
  deleteEvent(event: WeranionEvent): void {
    this.dialogService.openConfirmAlert('Suppression d\'un événement', 'Êtes-vous sûr de vouloir supprimer cet événement ?').subscribe(result => {
      if (result) {
        this.currentHistory.events = this.currentHistory.events.filter(currentHistoryEvent => currentHistoryEvent.title !== event.title);
        this.updateHistory(this.currentHistory);
      }
    });
  }

  /** Update the current history
   *
   * @param history The updated history
   */
  updateHistory(history: WeranionHistory): void {
    this.historyService.updateHistory(history).subscribe();
  }
}
