import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'siat-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
})
export class ScheduleTableComponent implements OnInit, OnChanges{
  @Input() events: Array<any>;
  @Output() deleteGroupEvent = new EventEmitter<any>();

  public hourKeyIndexes: Array<Array<any>> = [[], [], [], [], [], []];
  private dayEvents: Array<Array<any>> = [[], [], [], [], [], []];
  public visiblePopover: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void{
    this.createHourKeyIndexes();
    if (this.events) {
      this.getDayEvents();
      this.assignDayEventsToHours();
    }
  }

  public getDayEvents() {
    for (let i = 0; i < 6; i++) {
      this.dayEvents[i] = this.events.filter((element) => {
        return element.weekDay === i;
      });
    }
  }

  private createHourKeyIndexes() {
    for (let i = 0; i < 6; i++) {
      let hour = 7;
      let halfHour = false;
      for (let j = 0; j < 30; j++) {
        if (halfHour) {
          this.hourKeyIndexes[i][hour + ':' + '30'] = null;
          halfHour = false;
          hour++;
        } else {
          this.hourKeyIndexes[i][hour + ':' + '00'] = null;
          halfHour = true;
        }
      }
    }
  }

  private getHourSpan(event: any){
    let startTime = event.startTimeString;
    const endTime = event.endTimeString;
    const hourSpan = [];

    while (startTime !== endTime){
      const splitTime = startTime.split(':');
      const hour = Number.parseInt(splitTime[0], 10);
      const minutes = Number.parseInt(splitTime[1], 10);
      hourSpan.push(hour + ':' + (minutes === 0 ? '00' : '30'));
      if (splitTime[1] === '30'){
        startTime = (hour + 1) + ':00';
      } else {
        startTime = hour + ':30';
      }
    }
    return hourSpan;
  }

  private assignDayEventsToHours(){
    for (const [i, day] of this.dayEvents.entries()) {
      for (const event of day) {
        for (const hour of this.getHourSpan(event)){
          this.hourKeyIndexes[i][hour] = event;
        }
      }
    }
  }

  public getHours(){
    return Object.keys(this.hourKeyIndexes[0]);
  }

  public deleteGroup(event){
    this.deleteGroupEvent.emit(event);
  }
}
