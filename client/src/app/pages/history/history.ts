import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeranionEvent, WeranionHistory } from '../../models/history.models';
import { Month, WeranionDate } from '../../models/utils.models';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  imports: [
    NgClass
  ],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class HistoryPage implements OnInit {
  currentDate: WeranionDate = {
    year: 1,
    month: 5
  };

  histories: WeranionHistory[] = [];

  timeLine: WeranionDate[] = [];

  /**
   *
   * @param historyService
   */
  constructor(
    private historyService: HistoryService
  ) {}

  /**
   *
   */
  ngOnInit() {
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

  /**
   *
   */
  createTimeLine() {
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

  currentHistory?: WeranionHistory;
  selectedEvent?: WeranionEvent;

  /**
   *
   * @param time
   */
  selectMonth(time: WeranionDate){
    this.currentHistory = this.histories.find(history => time.year === history.year && time.month === history.month);
    this.selectedEvent = this.currentHistory?.events?.[0];
  }

  /**
   *
   * @param event
   */
  selectEvent(event: WeranionEvent): void {
    this.selectedEvent = event;
  }
}
