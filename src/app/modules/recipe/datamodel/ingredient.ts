import { FoodNutrients } from '../../nutrients/datamodel/food-nutrients';
import { NutrientsNames } from '../../nutrients/datamodel/nutrients-names';

/**
 * @description Represents a food ingredient (ex: Chocolate, Strawberry...)
 */
export class Ingredient {
    private readonly _name: string;
    private readonly _foodNutrients: FoodNutrients;

    constructor(name: string, foodNutrients: FoodNutrients) {
        this._name = name;
        this._foodNutrients = foodNutrients;
    }

    public get name(): string {
        return this._name;
    }

    public get foodNutrients(): FoodNutrients {
        return this._foodNutrients;
    }

    public get nutrientsNames(): NutrientsNames[] {
        return this.foodNutrients.ingredientsNames;
    }

    public getNutrientQuantity(nutrient: NutrientsNames): number {
        return this.foodNutrients.getNutrientQuantity(nutrient);
    }
}
