import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonStandardComponent } from '../../../ui-elements/components/button-standard/button-standard.component';

@Component({
    templateUrl: './profile-page-dialog.component.html',
    styleUrls: ['./profile-page-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageDialogComponent {

    public readonly buttonsStyle = ButtonStandardComponent.Shape.Rectangle;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public input: any
    ) { }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
