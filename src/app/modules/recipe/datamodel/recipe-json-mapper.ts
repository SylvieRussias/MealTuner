import { ClonableRecipe } from './editable-recipe';
import { Ingredient } from './ingredient';
import { Quantity } from './quantity';
import { FoodNutrients } from '../../nutrients/datamodel/food-nutrients';
import { NutrientsNames } from '../../nutrients/datamodel/nutrients-names';
import { Recipe } from './recipe';

export class RecipeJsonMapper {
    private static readonly FOOD_REFERENCE_QUANTITY = 100;

    /**
     * @description Formats a recipe json to an EditableRecipe objects
     */
    public static formatJsonToRecipe(jsonRecipe: any): ClonableRecipe {
        const ingredients: Map<Ingredient, Quantity> =
            this.formatJsonToIngredients(jsonRecipe.ingredients);
        return new ClonableRecipe(jsonRecipe.name, jsonRecipe.description, ingredients);
    }

    /**
     * @description Formats a recipe as a recipe json (which is an object that can be saved)
     */
    public static formatRecipeToJson(recipe: Recipe): any {
        const result: any = {};
        result.name = recipe.name;
        result.description = recipe.description;
        result.ingredients = this.formatIngredientsToJson(recipe.quantifiedIngredients);
        return result;
    }

    public static recipeDeepEquals(recipeA: Recipe, recipeB: Recipe): boolean {
        return this.getStringJson(recipeA)
            === this.getStringJson(recipeB);
    }

    private static getStringJson(recipe: Recipe): string {
        return JSON.stringify(this.formatRecipeToJson(recipe));
    }

    private static formatJsonToIngredients(jsonIngredients: any): Map<Ingredient, Quantity> {
        const ingredients: Map<Ingredient, Quantity> = new Map()
        for (const ingredient of jsonIngredients) {
            const nutrients: Map<NutrientsNames, number> =
                this.formatJsonToNutrients(ingredient.nutrients);
            const ingredientNutrientsQuantityReference: number =
                ingredient.nutrients.referenceQuantity;
            ingredients.set(
                new Ingredient(ingredient.name, new FoodNutrients(nutrients, ingredientNutrientsQuantityReference)),
                new Quantity(ingredient.quantity)
            );
        }
        return ingredients;
    }

    private static formatJsonToNutrients(jsonNutrients: any): Map<NutrientsNames, number> {
        const nutrients: Map<NutrientsNames, number> = new Map()
        Object.keys(jsonNutrients).forEach((key) => {
            if (NutrientsNames[key] !== undefined) {
                nutrients.set(NutrientsNames[key], jsonNutrients[key]);
            }
        });
        return nutrients;
    }

    private static formatIngredientsToJson(quantitiesByIngredient: Map<Ingredient, Quantity>): any[] {
        const result: any = [];
        for (const ingredient of Array.from(quantitiesByIngredient.keys())) {
            result.push({
                name: ingredient.name,
                quantity: quantitiesByIngredient.get(ingredient).quantityInGrams,
                nutrients: this.formatNutrientsToJson(ingredient.foodNutrients.allNutrients)
            });
        }
        return result;
    }

    private static formatNutrientsToJson(quantitiesByNutrient: Map<NutrientsNames, number>): any {
        const referenceQuantity = this.FOOD_REFERENCE_QUANTITY;
        const result: any = {};
        for (const nutrient of Array.from(quantitiesByNutrient.keys())) {
            result[NutrientsNames[nutrient]] = quantitiesByNutrient.get(nutrient) * referenceQuantity;
        }
        result.referenceQuantity = referenceQuantity;
        return result;
    }
}