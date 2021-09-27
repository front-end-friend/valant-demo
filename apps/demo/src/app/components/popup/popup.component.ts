import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'valant-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

  @Input() show: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
