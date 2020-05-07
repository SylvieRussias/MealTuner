export class Interval {
    private _min: number;
    private _max: number;

    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    public get min(): number {
        return this._min;
    }

    public get max(): number {
        return this._max;
    }

    public isValueWithinIntervalBounds(value: number): boolean {
        return value >= this._min && value <= this._max;
    }
}
