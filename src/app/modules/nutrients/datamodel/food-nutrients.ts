import { NutrientsNames } from './nutrients-names';

/**
 * @description Represents the nutrients in food
 */
export class FoodNutrients {
    // Quantity by nutrient
    private readonly _nutrients: Map<NutrientsNames, number> = new Map();

    /**
     * @param totalFoodQuantity: If the total food quantity is defined, all 
     * quantity are calculated to be the ratio for 1 gram of food
     */
    constructor(
        nutrients?: Map<NutrientsNames, number>,
        totalFoodQuantity?: number
    ) {
        const ratioDivider = totalFoodQuantity ? totalFoodQuantity : 1;
        this._nutrients = nutrients ? new Map(nutrients) : new Map();
        this.divideAllNutrientsValues(ratioDivider);
        this.addMissingNutrientsWithEmptyQuantities();
    }

    public get allNutrients(): Map<NutrientsNames, number> {
        return this._nutrients;
    }

    public get ingredientsNames(): NutrientsNames[] {
        return Array.from(this.allNutrients.keys());
    }

    public getNutrientQuantity(nutrientName: NutrientsNames): number {
        return this._nutrients.get(nutrientName);
    }

    private divideAllNutrientsValues(divider: number): void {
        this._nutrients.forEach((value: number, key: NutrientsNames) => {
            this._nutrients.set(key, value / divider);
        });
    }

    private addMissingNutrientsWithEmptyQuantities(): void {
        const nutrientsNames: NutrientsNames[] = NutrientsNames.getAllEnumValues();
        for (const nutrient of nutrientsNames) {
            if (!this._nutrients.has(nutrient)) {
                this._nutrients.set(nutrient, 0);
            }
        }
    }
}
