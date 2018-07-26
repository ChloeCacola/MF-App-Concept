import { Directive, HostBinding, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, take } from 'rxjs/operators';

// NOTE:  This reactive approach is good for being able to apply more operators.
// It is slighly more complicated than the non-reactive version (draggable), esp. w/ dragging bool

@Directive({
  selector: '[appDraggableRx]'
})
export class DraggableRxDirective implements OnInit {

  constructor() { }

  @HostBinding('class.draggable-rx') draggableRx = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  // triggered in hostelistener event
  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    this.pointerDown.next(event);
  }
  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    this.pointerMove.next(event);
  }
  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    this.pointerUp.next(event);
  }

  ngOnInit() {
    // observable stream of drag start
    const dragStart$ = this.pointerDown.asObservable()
    // subscribe and pass this event to the event emitter
    .subscribe(event => {
        this.dragging = true;
        this.dragStart.emit(event);
    });

    // observable stream of drag move
    const dragMove$ = this.pointerDown.pipe(
        // after pointerDown happens, switch to pointerMove when moving..
        switchMap(() => this.pointerMove
        // ..until user releases click (pointerUp)
        .pipe(takeUntil(this.pointerUp))
        )
    )
    // subscribe and pass this event to the event emitter
    .subscribe(event => this.dragMove.emit(event));

    // observable stream of drag end
    const dragEnd$ = this.pointerDown.pipe(
        // after pointerDown happens, switch to pointerUp when click is released..
        switchMap(() => this.pointerUp
        // ..and completes after the entire move
        .pipe(take(1))
        )
    )
    // subscribe and pass this event to the event emitter
    .subscribe(event => {
        this.dragging = false;
        this.dragEnd.emit(event);
    });

  }
}
