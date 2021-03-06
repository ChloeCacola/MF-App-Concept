import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor() { }

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();


  // emit the drag start event when user first click and holds a widget
  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void {
    this.dragging = true;
    // prevents click of two elements at the same time on nested elements that are moveable
    event.stopPropagation();
    this.dragStart.emit(event);
  }
  // emit the drag move event when moving so long as dragging is true
  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }
  // emit the drag end event when click is released and set dragging back to false
  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);
  }
}
