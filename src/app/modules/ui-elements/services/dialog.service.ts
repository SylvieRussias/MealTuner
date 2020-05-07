import { Injectable } from '@angular/core';
import { ConfirmDialogInput, ConfirmDialogOutput, ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private dialogRef: MatDialogRef<any, any>;

    constructor(private dialog: MatDialog) { }

    public openConfirmDialog(config: ConfirmDialogInput): Observable<ConfirmDialogOutput> {
        this.closeOpenDialogIfAny();
        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: config,
            autoFocus: false
        });
        return this.dialogRef.afterClosed();
    }

    public openInfoDialog(infoText: string): void {
        this.openDialog(InfoDialogComponent, infoText);
    }

    public openDialog<T, R>(dialogComponent: ComponentType<T>, dialogInputData?: any): Observable<R> {
        this.closeOpenDialogIfAny();
        this.dialogRef = this.dialog.open(dialogComponent, {
            data: dialogInputData,
            autoFocus: false
        });
        return this.dialogRef.afterClosed();
    }

    private closeOpenDialogIfAny(): void {
        if (this.dialogRef && this.dialogRef.getState() === MatDialogState.OPEN) {
            this.dialogRef.close();
        }
    }
}
