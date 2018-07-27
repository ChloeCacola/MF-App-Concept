import { DraggableDirective } from './draggable.directive';
import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

// defining position (where the element gets moved to)
interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMoveable]'
})
// moveable will inherit the draggable directive so that appDraggable is not needed in addition to appMoveable
export class MoveableDirective extends DraggableDirective {

  // where the el. gets moved to
  private position: Position = {x: 0, y: 0};
  // initial position
  private startPosition: Position;

  // used to determine reseting positions
  // tip: use [resetPosition]="true" on element to reset
  @Input('resetPosition') resetPosition = false;

  // alter position (safestyle needed for angular trust)
  // TO DO:  Use Renderer2 here instead to eliminate need to sanitize!
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }
  // add moveable class to identify moveable elements
  @HostBinding('class.moveable') moveable = true;


  // mark position as safe with sanitizer
  constructor(private sanitizer: DomSanitizer) {
    super();
  }

 // host listeners work for angular events! (dragStart is the eventemitter in draggable directive)
  @HostListener('dragStart', ['$event'])onDragStart(event: PointerEvent) {
    // calculating the start position
    // note: this.position will be also be user's saved position in user's settings
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }

  @HostListener('dragMove', ['$event'])onDragMove(event: PointerEvent) {
    // transforming the position, allowing user to move the element
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  @HostListener('dragEnd', ['$event'])onDragEnd(event: PointerEvent) {
    if (this.resetPosition) {
      this.position = {x: 0, y: 0};
    }
  }

}
