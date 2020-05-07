import { Interval } from './interval';

/**
 * @description Defines quality intervals around an optimum, with intervals of :
 * - Values that are at least "medium" (the others are "bad")
 * - Values that are at least "good" (the others are "bad" or "medium")
 * Notice : Values should be as :
 * possibleValues.min <= mediumValues.min <= goodValues.min  <= goodValues.max <= mediumValues.max <= possibleValues.max
 */
export class QualityIntervals {
    // All the possible values
    private _possibleValues: Interval;
    // All the values that are at least "medium"
    private _mediumValues: Interval;
    // All the values that are at least "good"
    private _goodValues: Interval;

    constructor(
        possibleValues: Interval,
        mediumValues: Interval,
        goodValues: Interval
    ) {
        this._possibleValues = possibleValues;
        this._mediumValues = mediumValues;
        this._goodValues = new Interval(
            goodValues.min * 0.8,
            goodValues.max * 1.2
        );
    }

    public get possibleValues(): Interval {
        return this._possibleValues;
    }

    public get mediumValues(): Interval {
        return this._mediumValues;
    }

    public get goodValues(): Interval {
        return this._goodValues;
    }

    public isValueGood(value: number): boolean {
        return this.goodValues.isValueWithinIntervalBounds(value);
    }

    public isValueMedium(value: number): boolean {
        return (
            !this.isValueGood(value) &&
            this.mediumValues.isValueWithinIntervalBounds(value)
        );
    }

    public isValueBad(value: number): boolean {
        return !this.isValueGood(value) && !this.isValueMedium(value);
    }
}
