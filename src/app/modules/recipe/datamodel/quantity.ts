/**
 * @description Represents a quantity for an ingredient (ex: 10 grams, 50 grams...)
 */
export class Quantity {
    private readonly _quantityInGrams: number;

    constructor(quantityInGrams?: number) {
        this._quantityInGrams = quantityInGrams ? quantityInGrams : 0;
    }

    public get quantityInGrams(): number {
        return this._quantityInGrams;
    }

    public multiplyBy(multiplier: number): Quantity {
        return new Quantity(this._quantityInGrams * multiplier);
    }
}
