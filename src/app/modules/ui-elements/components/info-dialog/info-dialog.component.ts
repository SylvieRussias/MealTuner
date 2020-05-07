import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ButtonStandardComponent } from '../button-standard/button-standard.component';

@Component({
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoDialogComponent {

    public readonly buttonStyle = ButtonStandardComponent.Shape.Rectangle;

    constructor(
        public dialogRef: MatDialogRef<InfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public infoText: string
    ) { }

    public close(): void {
        this.dialogRef.close();
    }
}
