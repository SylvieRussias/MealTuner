import { ButtonSmallComponent } from './../button-small/button-small.component';
import { Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';

export abstract class EditableTextComponent {
    @Input() public isEditable: boolean = false;
    @Input() public textPlaceholder: string = '';
    @Output() public textChange: EventEmitter<string> = new EventEmitter();

    public _text: string;
    public isInputOpen: boolean = false;
    public textInputController: FormControl = new FormControl();
    @ViewChild('textInput') private textMatInput: MatInput;

    public editButtonStyle = ButtonSmallComponent.Styles.Standard;

    @Input() set text(text: string) {
        this._text = text;
        this.textInputController.setValue(this._text);
    }

    public isEditButtonVisible(): boolean {
        return this.isEditable && !this.isInputOpen;
    }

    public openTextInput(): void {
        this.isInputOpen = true;
        // Wait for input to be selectable in the view then focus it
        setTimeout(() => this.textMatInput.focus(), 1);
    }

    public leaveTextInput(): void {
        this.updateTextWithInputValue();
        this.closeTextInput();
    }

    private closeTextInput(): void {
        this.isInputOpen = false;
    }

    private updateTextWithInputValue(): void {
        this.triggerTextChange(this.textInputController.value);
    }

    private triggerTextChange(newText: string): void {
        this.text = newText;
        this.textChange.emit(newText);
    }
}
