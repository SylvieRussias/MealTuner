import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonSmallComponent } from '../button-small/button-small.component';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent {
    @Input() private defaultValue: number = 0;
    @Input() private minValue: number = 0;
    @Output() private valueChanged: EventEmitter<number> = new EventEmitter();

    public numberInputController: FormControl = new FormControl();
    public readonly addAndRemoveButtonSize = ButtonSmallComponent.Sizes.Smaller;

    @Input() set value(value: number) {
        if (value === undefined) {
            value = this.defaultValue;
        }
        this.numberInputController.setValue(value);
    }

    public canRemoveOne(): boolean {
        return this._value >= this.minValue + 1;
    }

    public removeOne(): void {
        this.addToCurrentValue(-1);
        this.triggerValueChange();
    }

    public addOne(): void {
        this.addToCurrentValue(1);
        this.triggerValueChange();
    }

    public triggerValueChange(): void {
        this.replaceCurrentValueByDefaultIfNotValid();
        this.valueChanged.emit(this._value);
    }

    private replaceCurrentValueByDefaultIfNotValid(): void {
        if (!this.isCurrentValueValid(this._value)) {
            this.value = this.defaultValue;
        }
    }

    private isCurrentValueValid(value: number): boolean {
        return value && value >= this.minValue;
    }

    private get _value(): number {
        return Number(this.numberInputController.value);
    }

    private addToCurrentValue(valueToAdd: number): void {
        const newValue: number = this._value + valueToAdd;
        this.value = newValue;
    }
}
