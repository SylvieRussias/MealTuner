import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { Quantity } from './quantity';

export class ClonableRecipe extends Recipe {

    /**
     * @override
     * @description Deep copy
     */
    public clone(): ClonableRecipe {
        return new ClonableRecipe(this.name,
            this.description,
            new Map(this.quantifiedIngredients)
        );
    }

    /**
     * @description Deep copy with an ingredient quantity edited
     */
    public cloneWithEditedIngredientQuantity(ingredientEditedInCopy: Ingredient, quantityInCopy: Quantity): ClonableRecipe {
        const quantifiedIngredients: Map<Ingredient, Quantity> = this.quantifiedIngredients;
        quantifiedIngredients.set(ingredientEditedInCopy, quantityInCopy);
        return new ClonableRecipe(this.name,
            this.description,
            quantifiedIngredients
        );
    }

    /**
     * @description Deep copy without an ingredient (that won't be in the copy)
     */
    public cloneWithRemovedIngredient(ingredientRemovedInClone: Ingredient): ClonableRecipe {
        const quantifiedIngredients: Map<Ingredient, Quantity> = this.quantifiedIngredients;
        if (this.hasIngredient(ingredientRemovedInClone)) {
            quantifiedIngredients.delete(ingredientRemovedInClone);
        }
        return new ClonableRecipe(
            this.name,
            this.description,
            quantifiedIngredients
        );
    }

    /**
     * @description Deep copy with another name
     */
    public cloneWithNewName(recipeNameIncClone: string): ClonableRecipe {
        return new ClonableRecipe(
            recipeNameIncClone,
            this.description,
            this.quantifiedIngredients
        );
    }

    /**
     * @description Deep copy with another description
     */
    public cloneWithNewDescription(descriptionIncClone: string): ClonableRecipe {
        return new ClonableRecipe(
            this.name,
            descriptionIncClone,
            this.quantifiedIngredients
        );
    }

    /**
     * @description Deep copy with all quantities multiplied
     */
    public cloneWithAllQuantitiesMultiplied(multiplier: number): ClonableRecipe {
        const ingredientsForClone: Map<Ingredient, Quantity> = new Map();
        for (const ingredient of Array.from(this.quantifiedIngredients.keys())) {
            const initialQuantity = this.quantifiedIngredients.get(ingredient);
            ingredientsForClone.set(ingredient, initialQuantity.multiplyBy(multiplier));
        }
        return new ClonableRecipe(this.name,
            this.description,
            ingredientsForClone
        );
    }
}