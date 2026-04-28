import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HistoryDialog } from '../../components/history-dialog/history-dialog';
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
  histories: WritableSignal<WeranionHistory[]> = signal<WeranionHistory[]>([]);

  /** The time line object */
  timeLine: WritableSignal<WeranionDate[]> = signal<WeranionDate[]>([]);

  /** Whether the page is in edit mode */
  editMode: WritableSignal<boolean> = signal<boolean>(false);

  /** The selected history */
  currentHistory: WritableSignal<WeranionHistory | undefined> = signal<WeranionHistory | undefined>(undefined);

  /** The selected event */
  selectedEvent: WritableSignal<WeranionEvent | undefined> = signal<WeranionEvent | undefined>(undefined);

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
      this.histories.set(histories);
      this.timeLine.update(timeLine =>
        timeLine.map(time => {
          const history = histories.find(history => history.year === time.year && history.month === time.month);
          return history ? { ...time, eventTitle: history.title } : time;
        })
      );
      this.selectHistory({ year: this.currentDate.year, month: this.currentDate.month });
    });
  }

  /** HystoryPage after view init */
  ngAfterViewInit(): void {
    this.scrollToRight();
  }

  /** Call after the init of the page to set the timeline to the right */
  scrollToRight(): void {
    const element = this.scrollContainer.nativeElement;
    element.scrollLeft = element.scrollWidth;
  }

  /** Create the time line object */
  createTimeLine(): void {
    const timeline: WeranionDate[] = [];
    let year = 0;
    while (year < this.currentDate.year) {
      for (let month = 1; month <= 12; month++) {
        timeline.push({ year, month: month as Month });
      }
      year++;
    }
    for (let month = 1; month <= this.currentDate.month; month++) {
      timeline.push({ year, month: month as Month });
    }
    this.timeLine.set(timeline);
  }

  /** Select a month in the timeline
   *
   * @param time The Weranion date
   */
  selectHistory(time: WeranionDate): void {
    const history = this.histories().find(history => history.year === time.year && history.month === time.month) 
      ?? this.createEmptyHistory(time.year, time.month);
    this.currentHistory.set(history);
    this.selectedEvent.set(history?.events?.[0]);
  }

  /** Creates an empty history object for a given year and month
   * 
   * @param year The year of the history to create
   * @param month The month of the history to create
   * @returns An empty history object
   */
  createEmptyHistory(year: number, month: number): WeranionHistory {
    return {
      year,
      month,
      title: '',
      details: '',
      events: []
    };
  }

  /** Open a dialog to edit the current history */
  editHistory(): void {
    this.dialogService.openDialog<HistoryDialog, WeranionHistory>({
      component: HistoryDialog,
      data: this.currentHistory()
    }).afterClosed().subscribe(result => {
      if (result) {
        this.saveHistory({ ...this.currentHistory()!, ...result });
      } 
    });
  }

  /** Select an event in the current history
   *
   * @param event
   */
  selectEvent(event: WeranionEvent): void {
    this.selectedEvent.set(event);
  }

  /** Move an event in the month events list
   *
   * @param eventObject The object that contains the previous and current index of the event in the list
   */
  moveAnEventInTheMonth(eventObject: CdkDragDrop<string[]>): void {
    const events = [...this.currentHistory()!.events];
    moveItemInArray(events, eventObject.previousIndex, eventObject.currentIndex);
    this.saveHistory({ ...this.currentHistory()!, events });
  } 
  
  /** Switch between read and edit mode */
  switchEditMode(): void {
    this.editMode.update(mode => !mode);
  }

  /** Open a dialog to add an event to the current history */ 
  addEvent(): void {
    this.dialogService.openDialog<HistoryEventDialog, WeranionEvent>({
      component: HistoryEventDialog
    }).afterClosed().subscribe(result => {
      if (result) {
        this.saveHistory({
          ...this.currentHistory()!,
          events: [...this.currentHistory()!.events, result]
        });
      }
    });
  }

  /** Update an event
   *
   * @param event The event to update
   */
  editEvent(event: WeranionEvent): void {
    const eventIndex = this.currentHistory()!.events.findIndex(historyEvent => historyEvent._id === event._id);
    this.dialogService.openDialog<HistoryEventDialog, WeranionEvent>({
      component: HistoryEventDialog,
      data: event
    }).afterClosed().subscribe(result => {
      if (result) {
        const events = [...this.currentHistory()!.events];
        events[eventIndex] = result;
        this.saveHistory({ ...this.currentHistory()!, events });
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
        this.saveHistory({
          ...this.currentHistory()!,
          events: this.currentHistory()!.events.filter(historyEvent => historyEvent._id !== event._id)
        });
      }
    });
  }

  /** Update the current history
   *
   * @param history The updated history
   */
  saveHistory(history: WeranionHistory): void {
    this.historyService.updateHistory(history).subscribe(updatedHistory => {
      this.currentHistory.set(updatedHistory);
      this.histories.update(histories =>
        histories.map(history => history._id === updatedHistory._id ? updatedHistory : history)
      );
    });
  }
}
