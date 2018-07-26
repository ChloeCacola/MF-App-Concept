import { DraggableDirective } from './draggable.directive';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMoveable]'
})
// moveable will inherit the draggable directive so that appDraggable is not needed in addition to appMoveable
export class MoveableDirective extends DraggableDirective {

 // host listeners work for angular events (dragStart is the eventemitter in draggable directive)
  @HostListener('dragStart')onDragStart() {
    console.log('start moving');
  }

}
