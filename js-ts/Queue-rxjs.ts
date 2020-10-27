import { Subject, Observable, Subscription } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

export class Queue<T, R> {
  // T: input type
  // R: return type
  readonly inputs = new Subject<T>();
  readonly numWorkers: number;
  readonly results: Observable<R>;
  readonly subscription: Subscription;

  constructor(
    numWorkers: number,
    processItemFunc: (item: T, index: number) => Observable<R>,
    subscriberFunc: (result: R) => void, // invoked when real result arrives
    willProcessFunc: (item: T) => void, // hook called just before subscriberFunc is called
    didProcessFunc: (result: R) => void // hook called just after subscriberFunc is called
  ) {
    this.numWorkers = numWorkers;
    this.results = this.inputs.pipe(
      mergeMap(
        (item: T, index: number) => {
          willProcessFunc(item);
          return processItemFunc(item, index);
        },
        null,
        this.numWorkers
      ),
      tap(didProcessFunc)
    );
    this.subscription = this.results.subscribe(subscriberFunc, (err) => {
      if (err === null) {
        // do nothing... we handled the error elsewhere
      } else {
        console.log("Queue had uncaught error:", err);
      }
    });
  }

  next(item: T): void {
    this.inputs.next(item);
  }
}
