import { NutrientsNames } from './nutrients-names';
import { QuantityTarget } from './quantity-target';

/**
 * @description Represents the nutrients for a desired portion
 * (ex: a daily portion for 1 person, a breakfast portion for 6 people...)
 */
export class NutrientsQuantitiesTarget {
    // Nutrients and their desired quantity (in grams)
    private readonly _nutrients: Map<NutrientsNames, QuantityTarget> = new Map();

    constructor(nutrients: Map<NutrientsNames, QuantityTarget>) {
        this._nutrients = nutrients;
    }

    public get nutrients(): Map<NutrientsNames, QuantityTarget> {
        return this._nutrients;
    }

    public multiplyBy(multiplier: number): NutrientsQuantitiesTarget {
        const multipliedNutrients: Map<NutrientsNames, QuantityTarget> = new Map();
        for (const nutrientName of Array.from(this._nutrients.keys())) {
            const valueBeforeMultiplying = this._nutrients.get(nutrientName);
            const newValue = valueBeforeMultiplying.multiplyBy(multiplier);
            multipliedNutrients.set(nutrientName, newValue);
        }
        return new NutrientsQuantitiesTarget(multipliedNutrients);
    }
}
