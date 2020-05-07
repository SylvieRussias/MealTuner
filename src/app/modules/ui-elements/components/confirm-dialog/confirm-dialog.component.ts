import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonStandardComponent } from '../button-standard/button-standard.component';

export interface ConfirmDialogInput {
    question: string;
    confirmText: string;
}

export class ConfirmDialogOutput {
    hasConfirmed: boolean;
}

@Component({
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
    public readonly cancelButtonStyle = ButtonStandardComponent.Styles.SecondaryAction;
    public readonly buttonsStyle = ButtonStandardComponent.Shape.Rectangle;

    private output: ConfirmDialogOutput = new ConfirmDialogOutput();

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public input: ConfirmDialogInput
    ) { }

    public confirm(): void {
        this.output.hasConfirmed = true;
        this.closeDialog();
    }

    public cancel(): void {
        this.output.hasConfirmed = false;
        this.closeDialog();
    }

    private closeDialog(): void {
        this.dialogRef.close(this.output);
    }
}