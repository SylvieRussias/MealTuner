import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { QualityIntervals } from '../../datamodel/quality-intervals';
import { trigger, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-slider-for-quality-intervals',
    templateUrl: './slider-for-quality-intervals.component.html',
    styleUrls: ['./slider-for-quality-intervals.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('all', [
            transition('* <=> *', animate('0ms ease-in')),
        ])
    ]
})
export class SliderForQualityIntervalsComponent {

    @Input() public currentQuantity: number;

    @Input() public set qualityIntervals(qualityIntervals: QualityIntervals) {
        this._qualityIntervals = qualityIntervals;
        this.setSliderMinAndMaxValues(qualityIntervals);
        this.setSliderTrackPartsWidth(qualityIntervals);
    }

    // Mat-slider bounds
    public sliderMinValue: number;
    public sliderMaxValue: number;

    // Width of the different parts of the track (in %)
    public badToMediumTrackPartWidth: number;
    public mediumToGoodTrackPartWidth: number;
    public goodToMediumTrackPartWidth: number;
    public mediumToBadTrackPartWidth: number;

    // Copy of qualityIntervals input
    private _qualityIntervals: QualityIntervals;

    // TODO: move functions in the appropriate classes
    public isValueGood(): boolean {
        return this._qualityIntervals.isValueGood(this.currentQuantity);
    }

    public isValueMedium(): boolean {
        return this._qualityIntervals.isValueMedium(this.currentQuantity);
    }

    public isValueBad(): boolean {
        return this._qualityIntervals.isValueBad(this.currentQuantity);
    }

    /**
     * @description Sets the slider min and max values to be the min and max possible values of an interval
     * @param intervals: a QualityIntervals object, that has an interval of possible values
     */
    private setSliderMinAndMaxValues(intervals: QualityIntervals) {
        this.sliderMinValue = intervals.possibleValues.min;
        this.sliderMaxValue = intervals.possibleValues.max;
    }

    /**
     * @description Calculates the widths of the slider track parts (ex: red-to-yellow gradient part)
     * according to quality intervals
     * @param intervals: the quality intervals
     */
    private setSliderTrackPartsWidth(intervals: QualityIntervals): void {
        const range = intervals.possibleValues.max - intervals.possibleValues.min;
        const firstMediumMiddle = this.mean(intervals.mediumValues.min, intervals.goodValues.min);
        const secondMediumMiddle = this.mean(intervals.mediumValues.max, intervals.goodValues.max);
        const goodmiddle = this.mean(intervals.goodValues.min, intervals.goodValues.max);
        this.badToMediumTrackPartWidth = this.calculateSliderTrackPartWidth(intervals.possibleValues.min, firstMediumMiddle, range);
        this.mediumToGoodTrackPartWidth = this.calculateSliderTrackPartWidth(firstMediumMiddle, goodmiddle, range);
        this.goodToMediumTrackPartWidth = this.calculateSliderTrackPartWidth(goodmiddle, secondMediumMiddle, range);
        this.mediumToBadTrackPartWidth = this.calculateSliderTrackPartWidth(secondMediumMiddle, intervals.possibleValues.max, range);
    }

    private mean(a: number, b: number) {
        return (a + b) / 2;
    }

    private calculateSliderTrackPartWidth(startValue: number, endValue: number, trackLength: number): number {
        // * 100 to get the width in percentage
        return ((endValue - startValue) * 100) / trackLength;
    }
}
