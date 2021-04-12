import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private channels: { [key: string]: Subject<any> } = {};

  /**
   * Subscribe to provider and return an observable.
   * @param topic The name of the event topic to subscribe to
   * @param observer Observer or callback to listen for changes
   *
   * @returns Subscription to listen for changes
   */
  subscribe(topic: string, observer: (_: any) => void): Subscription {
    if (!this.channels[topic]) {
      this.channels[topic] = new Subject<any>();
    }
    return this.channels[topic].subscribe(observer);
  }

  /**
   * Publish data to certain topic
   * @param topic event topic to send data
   * @param data data in any format to pass on
   */
  publish(topic: string, data?: any): void {
    const subject = this.channels[topic];
    if (!subject) {
      // Or you can create a new subject for future subscribers
      return;
    }
    subject.next(data);
  }

  /**
   * Destroy topic when finished using it
   * @param topic topic event to destroy
   */
  destroy(topic: string): null {
    const subject = this.channels[topic];
    if (!subject) {
      return;
    }
    subject.complete();
    delete this.channels[topic];
  }
}
