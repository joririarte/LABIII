import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppEvent } from '../../models/enums/app-events.enum';

interface EventDetails {
  event: AppEvent;
  payload?: unknown;
}

@Injectable({ providedIn: 'root' })
export class AppEventsService {
  private eventsDispatcher = new Subject<EventDetails>();

  public dispatch(event: AppEvent, payload?: unknown): void {
    this.eventsDispatcher.next({ event, payload });
  }

  public onEvent(event: AppEvent): Observable<unknown> {
    return this.eventsDispatcher.asObservable().pipe(
      filter((eventDetails) => eventDetails.event === event),
      map((eventDetails) => eventDetails.payload)
    );
  }
}
