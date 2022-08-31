import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss']
})
export class GeneralDetailsComponent implements OnInit {

  @Input()
  amountYetToPay: number = 0;

  @Input()
  amountPaid: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
