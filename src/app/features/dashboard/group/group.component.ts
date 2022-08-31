import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupDetail } from 'src/app/models/group-interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input()
  group: GroupDetail;

  panelOpenState: boolean = false;
  groupDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.groupDetailsForm = this.fb.group({
      groupName: [this.group.groupName, [Validators.required]],
      tripCost: [this.group.tripCost, [Validators.min(0), Validators.required]],
      members: this.fb.array([])
    });

    const members: FormArray = this.groupDetailsForm.get('members') as FormArray;
    for (let member of this.group.members) {
      const newMember: FormGroup = this.fb.group({
        memberName: [member.memberName, Validators.required],
        memberEmail: [member.memberEmail, [Validators.email, Validators.required]],
        amountPaid: [member.amountPaid, Validators.min(0)],
        balanceAmount: new FormControl({ value: member.balanceAmount, disabled: true }),
        originalBalanceAmount: new FormControl({ value: member.balanceAmount, disabled: true }),
        owner: [member.owner]
      });
      members.push(newMember);
    }

    this.groupDetailsForm.updateValueAndValidity();

  }

  onAmountPaid(ind : number) {
    const member: AbstractControl = this.allMembersControl[ind];
    let balanceAmount = +(member.get('originalBalanceAmount').value - member.get('amountPaid').value).toFixed(2);
    if (balanceAmount < 0) {
      alert("Amount Paid cannot be greater then Balance Amount, for Member : "+member.get('memberName').value);
      return;
    }
    member.get('balanceAmount').setValue(balanceAmount);
  }

  get allMembers() {
    return (<FormArray>this.groupDetailsForm.get('members'));
  }

  get allMembersControl() {
    return (<FormArray>this.groupDetailsForm.get('members')).controls;
  }

}
