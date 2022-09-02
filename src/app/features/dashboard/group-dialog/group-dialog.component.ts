import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  groupDetailsForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string },
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.groupDetailsForm = this.fb.group({
      groupName: ['', [Validators.required]],
      tripCost: ['', [Validators.min(0), Validators.required]],
      members: this.fb.array([])
    });
    this.onAddButton(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddButton(owner: boolean = false) {
    const members: FormArray = this.allMembers
    const newMember: FormGroup = this.fb.group({
      memberName: ['', [Validators.required]],
      memberEmail: ['', [Validators.email, Validators.required]],
      amountPaid: ['', Validators.min(0)],
      balanceAmount: ['', Validators.min(0)],
      owner: [owner]
    });
    members.push(newMember);
  }

  deleteItem(index: number) {
    const members: FormArray = this.allMembers;
    if (members.controls[index].get('owner').value === true) {
      alert("Cannot Delete Owner!");
      return;
    }

    if (confirm("Do you want to Delete this member ? ")) {
      members.removeAt(index);
    }
  }

  get allMembersControl() {
    return (<FormArray>this.groupDetailsForm.get('members')).controls;
  }

  get allMembers() {
    return (<FormArray>this.groupDetailsForm.get('members'));
  }

}
