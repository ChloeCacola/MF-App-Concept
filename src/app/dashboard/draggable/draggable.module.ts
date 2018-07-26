import { MoveableDirective } from './moveable.directive';
import { DraggableDirective } from './draggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableRxDirective } from './draggable-rx.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, DraggableRxDirective, MoveableDirective],
  exports: [DraggableDirective, DraggableRxDirective, MoveableDirective]
})
export class DraggableModule { }
