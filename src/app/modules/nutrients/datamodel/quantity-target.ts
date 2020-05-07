/**
 * @description Represents a target quantity, with an optimum value,
 * and min-max acceptable values
 */
export class QuantityTarget {
    private readonly _minValue: number;
    private readonly _optimum: number;
    private readonly _maxValue: number;

    private static readonly MIN_VALUE_ON_OPTIMUM_RATIO = 0.5;
    private static readonly MAX_VALUE_ON_OPTIMUM_RATIO = 1.5;

    constructor(optimum: number) {
        this._minValue = QuantityTarget.MIN_VALUE_ON_OPTIMUM_RATIO * optimum;
        this._optimum = optimum;
        this._maxValue = QuantityTarget.MAX_VALUE_ON_OPTIMUM_RATIO * optimum;
    }

    public get minValue(): number {
        return this._minValue;
    }

    public get optimum(): number {
        return this._optimum;
    }

    public get maxValue(): number {
        return this._maxValue;
    }

    public multiplyBy(multiplier: number): QuantityTarget {
        return new QuantityTarget(this.optimum * multiplier);
    }
}
