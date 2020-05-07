import { Ingredient } from './ingredient';
import { Quantity } from './quantity';
import { FoodNutrients } from '../../nutrients/datamodel/food-nutrients';
import { NutrientsNames } from '../../nutrients/datamodel/nutrients-names';

/**
 * @description Represents a dish recipe (ex: Chocolate pie, Fried rice...)
 */
export abstract class Recipe {
    // Map with all the ingredients (keys) for the recipe and their quantity (values)
    private readonly _quantifiedIngredients: Map<Ingredient, Quantity>;
    // Recipe title
    private readonly _name: string;
    private readonly _description: string;

    private static readonly RECIPE_DEFAULT_NAME = 'New Recipe';
    private static readonly RECIPE_DEFAULT_DESCRIPTION = 'Recipe description is empty, but you can write it :)';

    public constructor(
        name = Recipe.RECIPE_DEFAULT_NAME,
        description = Recipe.RECIPE_DEFAULT_DESCRIPTION,
        quantifiedIngredients?: Map<Ingredient, Quantity>
    ) {
        this._name = name;
        this._description = description;
        this._quantifiedIngredients = quantifiedIngredients
            ? new Map<Ingredient, Quantity>(quantifiedIngredients)
            : new Map<Ingredient, Quantity>();
    }

    public get quantifiedIngredients(): Map<Ingredient, Quantity> {
        return new Map(this._quantifiedIngredients);
    }

    public get description(): string {
        return this._description;
    }

    public get name(): string {
        return this._name;
    }

    public hasEmptyIngredientList(): boolean {
        return this._quantifiedIngredients.size === 0;
    }

    /**
     * @description Tells if the recipe contains an ingredient
     */
    public hasIngredient(ingredient: Ingredient): boolean {
        const recipeIngredients: Ingredient[] = Array.from(this.quantifiedIngredients.keys());
        const recipeIngredientNames = recipeIngredients.map((i: Ingredient) => i.name);
        return recipeIngredientNames.includes(ingredient.name);
    }

    /**
     * @description Makes a deep copy of this object
     * @returns the copy
     */
    public abstract clone();

    /**
     * @description Calculates the quantities of all nutrients in the recipe
     * @return the nutrients quantities
     */
    public get allNutrients(): FoodNutrients {
        const nutrients: Map<NutrientsNames, number> = new Map();
        for (const ingredient of this.quantifiedIngredients.keys()) {
            this.addIngredientNutrientsToTotalNutrients(ingredient, nutrients);
        }
        return new FoodNutrients(nutrients);
    }

    private addIngredientNutrientsToTotalNutrients(
        ingredient: Ingredient,
        totalNutrients: Map<NutrientsNames, number>
    ): void {
        for (const nutrient of ingredient.nutrientsNames) {
            this.addNutrientQuantityToTotalNutrients(nutrient, ingredient, totalNutrients);
        }
    }

    private addNutrientQuantityToTotalNutrients(
        nutrient: NutrientsNames,
        ingredient: Ingredient,
        totalNutrients: Map<NutrientsNames, number>
    ): void {
        const ingredientQuantity: number = this.quantifiedIngredients.get(ingredient).quantityInGrams;
        const nutrientQuantityInIngredient = ingredientQuantity * ingredient.getNutrientQuantity(nutrient);
        const currentNutrientQuantity = totalNutrients.has(nutrient) ? totalNutrients.get(nutrient) : 0;
        const newNutrientQuantity = currentNutrientQuantity + nutrientQuantityInIngredient;
        totalNutrients.set(nutrient, newNutrientQuantity);
    }
}
