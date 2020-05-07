import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Interval } from '../../datamodel/interval';
import { EventEmitter } from '@angular/core';
import { trigger, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('all', [transition('* <=> *', animate('400ms ease-in'))]),
    ],
})
export class SliderComponent {
    @Input() public value;
    @Input() public possibleValuesInterval: Interval;
    // When the slider is moved but still hold
    @Output() private temporaryValueChanged: EventEmitter<number> = new EventEmitter<number>();
    // When the slider is released after being moved
    @Output() private valueChanged: EventEmitter<number> = new EventEmitter<number>();

    private bufferedValue: number;
    private TEMP_VALUE_CHANGED: Subject<number> = new Subject<number>();

    constructor() {
        this.initTemporaryValueChangeThrottling();
    }

    public mouseUp() {
        setTimeout(() => {
            this.valueChanged.emit(this.bufferedValue);
        }, 1);
    }

    public changeValue($event): void {
        this.bufferedValue = $event.value;
    }

    public changeTempValue($event): void {
        this.TEMP_VALUE_CHANGED.next($event.value);
    }

    private initTemporaryValueChangeThrottling(): void {
        this.TEMP_VALUE_CHANGED.pipe(
            throttleTime(50)
        ).subscribe((newValue: number) => this.temporaryValueChanged.emit(newValue));
    }
}
