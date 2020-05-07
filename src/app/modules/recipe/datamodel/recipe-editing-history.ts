import { Quantity } from '../datamodel/quantity';
import { FoodNutrients } from '../../nutrients/datamodel/food-nutrients';
import { ClonableRecipe } from '../datamodel/editable-recipe';
import { Ingredient } from './ingredient';
import { History } from '../../../typescript-utils/history/history';
import { HistoryStatus } from '../../../typescript-utils/history/history-status';
import { Profile } from '../../nutrients/datamodel/profile';

export class RecipeEditingHistory {
    private readonly editingHistory: History<ClonableRecipe> = new History<ClonableRecipe>();
    private userProfile: Profile;

    constructor(editingHistory?: History<ClonableRecipe>,
        startRecipe?: ClonableRecipe,
        userProfile?: Profile
    ) {
        if (editingHistory) {
            this.editingHistory = editingHistory;
        } else {
            startRecipe = startRecipe ? startRecipe : new ClonableRecipe();
            this.startNewRecipe(startRecipe);
        }
        this.userProfile = userProfile ? userProfile : new Profile();
    }

    public get recipeRelativeToProfile(): ClonableRecipe {
        return this.recipe.cloneWithAllQuantitiesMultiplied(this.userProfile.quantitiesMultiplier);
    }

    public get nutrientsRelativeToProfile(): FoodNutrients {
        return this.recipeRelativeToProfile.allNutrients;
    }

    public canUndo(): boolean {
        return this.historyStatus.isUndoAvailable;
    }

    public canRedo(): boolean {
        return this.historyStatus.isRedoAvailable;
    }

    public setRecipeName(newName: string): void {
        const cloneWithNewName: ClonableRecipe = this.recipe.cloneWithNewName(newName);
        this.setCurrentRecipe(cloneWithNewName);
    }

    public setRecipeDescription(newDescription: string): void {
        const cloneWithNewDescription: ClonableRecipe = this.recipe.cloneWithNewDescription(newDescription);
        this.setCurrentRecipe(cloneWithNewDescription);
    }

    /**
     * @description Adds an ingredient to the current recipe (if it's not already in the recipe)
     */
    public addIngredient(ingredient: Ingredient): void {
        if (!this.recipe.hasIngredient(ingredient)) {
            this.setIngredientQuantity(ingredient, new Quantity());
        }
    }

    /**
     * @description Sets the quantity for an ingredient in the current recipe
     */
    public setIngredientQuantity(ingredient: Ingredient, quantity: Quantity): void {
        const normalizedQuantity = this.getQuantityRelativeToReferenceProfile(quantity);
        const cloneWithEditedIngredient: ClonableRecipe = this.recipe.cloneWithEditedIngredientQuantity(ingredient, normalizedQuantity);
        this.setCurrentRecipe(cloneWithEditedIngredient);
    }

    /**
     * @description Sets the quantity for an ingredient in the current recipe, without modifying the editing history
     */
    public setIngredientTemporaryQuantity(ingredient: Ingredient, quantity: Quantity): void {
        const normalizedQuantity = this.getQuantityRelativeToReferenceProfile(quantity);
        const cloneWithEditedIngredient: ClonableRecipe = this.recipe.cloneWithEditedIngredientQuantity(ingredient, normalizedQuantity);
        this.setTemporaryNewRecipe(cloneWithEditedIngredient);
    }

    /**
     * @description Removes an ingredient from the current recipe (if it's in the recipe)
     * @param ingredient: the ingredient to remove
     */
    public removeIngredient(ingredient: Ingredient): void {
        const cloneWithRemovedIngredient: ClonableRecipe = this.recipe.cloneWithRemovedIngredient(ingredient);
        this.setCurrentRecipe(cloneWithRemovedIngredient);
    }

    /**
     * @description Undo the last modification of the recipe
     */
    public undo(): void {
        this.editingHistory.undo();
    }

    /**
     * @description Redo the last undone modification of the recipe
     */
    public redo(): void {
        this.editingHistory.redo();
    }

    /**
     * @description Returns a deep copy of this object
     */
    public clone(): RecipeEditingHistory {
        return new RecipeEditingHistory(this.editingHistory.clone(), null, this.userProfile);
    }

    public toHistoryRelativeToProfile(profile: Profile): RecipeEditingHistory {
        return new RecipeEditingHistory(this.editingHistory.clone(), null, profile);
    }

    public toHistoryRelativeToReferenceProfile(): RecipeEditingHistory {
        return this.toHistoryRelativeToProfile(new Profile());
    }

    private get recipe(): ClonableRecipe {
        return this.historyStatus.currentValue;
    }

    private get historyStatus(): HistoryStatus<ClonableRecipe> {
        return this.editingHistory.status;
    }

    /**
     * @description Starts editing a new recipe
     * @param recipe: the new recipe to edit (if none is provided, starts a recipe from scratch)
     */
    private startNewRecipe(recipe?: ClonableRecipe): void {
        this.editingHistory.clear();
        const recipeToSet = recipe ? recipe : new ClonableRecipe();
        this.editingHistory.setNewStep(recipeToSet);
    }

    /**
     * @description Sets an new value for the recipe that is beeing edited and updates the editing history
     */
    private setCurrentRecipe(newRecipe: ClonableRecipe): void {
        this.editingHistory.setNewStep(newRecipe);
    }

    /**
     * @description Sets an new value for the recipe that is beeing edited without saving it it the editing history
     */
    private setTemporaryNewRecipe(newRecipe: ClonableRecipe): void {
        this.editingHistory.setNewStepWithoutSavingStep(newRecipe);
    }

    private getQuantityRelativeToReferenceProfile(quantityRelativeToCurrentProfile: Quantity): Quantity {
        return quantityRelativeToCurrentProfile.multiplyBy(1 / this.userProfile.quantitiesMultiplier);
    }
}