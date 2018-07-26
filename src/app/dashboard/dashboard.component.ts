import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  userWidgets = [{name: 'widget1', color: 'lightblue'}, {name: 'widget2', color: 'gray'}];

  onDragStart(event: PointerEvent): void {
    // console.log('drag start success');
  }
  onDragMove(event: PointerEvent): void {
    // console.log(`drag move success: ${Math.round(event.clientX)}, ${Math.round(event.clientY)} `);
  }
  onDragEnd(event: PointerEvent): void {
    // console.log('drag end success');
  }

  ngOnInit() {
  }

}
