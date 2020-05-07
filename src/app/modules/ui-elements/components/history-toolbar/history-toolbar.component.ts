import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ButtonSmallComponent } from '../button-small/button-small.component';

@Component({
    selector: 'app-history-toolbar',
    templateUrl: './history-toolbar.component.html',
    styleUrls: ['./history-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryToolbarComponent {
    @Input() isUndoAvailable: boolean;
    @Input() isRedoAvailbale: boolean;
    @Output() undoClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() redoClicked: EventEmitter<any> = new EventEmitter<any>();

    public undoRedoButtonStyle = ButtonSmallComponent.Styles.BlackNoBorder;
}
