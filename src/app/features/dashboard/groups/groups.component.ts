import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupDetail } from 'src/app/models/group-interface';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: GroupDetail[];
  totalTripCost: number;
  panelOpenState: boolean = true;
  amountPaid: number = 0;
  amountYetToPay: number = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groups = [];
    this.calculateTotalTripCost();
  }

  onAddNewGroup(): void {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '37.5rem',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.calculateBalanceAmount(result);
        this.groups.push(result);
        this.calculateTotalTripCost();
        this.calculateGeneralAmount();
      }
    });
  }

  calculateGeneralAmount() {
    this.amountYetToPay = 0;
    this.amountPaid = 0;
    for (let group of this.groups) {
      for (let member of group.members) {
        if (member.owner) {
          this.amountPaid += member.amountPaid;
          this.amountYetToPay += member.originalBalanceAmount;
        }
      }
    }
  }

  calculateBalanceAmount(result: GroupDetail) {
    let costPerMember: number = +(result.tripCost / result.members.length).toFixed(2);
    for (let member of result.members) {
      member.amountPaid = 0;
      member.balanceAmount = costPerMember;
      member.originalBalanceAmount = member.balanceAmount;
    }
  }

  calculateTotalTripCost(): void{
    let totalCost = 0;
    for (let group of this.groups) {
      totalCost += group.tripCost;
    }
    this.totalTripCost = totalCost;
  }
}
