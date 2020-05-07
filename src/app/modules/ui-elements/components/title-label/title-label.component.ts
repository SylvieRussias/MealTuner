import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EditableTextComponent } from '../editable-text/editabe-text.component';
import { ButtonSmallComponent } from '../button-small/button-small.component';

@Component({
    selector: 'app-title-label',
    templateUrl: './title-label.component.html',
    styleUrls: ['./title-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleLabelComponent extends EditableTextComponent {

    constructor() {
        super();
        this.editButtonStyle = ButtonSmallComponent.Styles.WhiteNoBorder;
    }
}
