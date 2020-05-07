import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EditableTextComponent } from '../editable-text/editabe-text.component';
import { ButtonSmallComponent } from '../button-small/button-small.component';

@Component({
    selector: 'app-text-section',
    templateUrl: './text-section.component.html',
    styleUrls: ['./text-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSectionComponent extends EditableTextComponent {
    @Input() public title: string;

    constructor() {
        super();
        this.editButtonStyle = ButtonSmallComponent.Styles.MainColorNoBorder;
    }
}
