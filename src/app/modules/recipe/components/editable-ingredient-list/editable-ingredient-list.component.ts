import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Ingredient } from '../../datamodel/ingredient';
import { Quantity } from '../../datamodel/quantity';
import { MergeableMap } from '../../../../typescript-utils/mergeable-map/mergeable-map';
import { RecipeEditingHistory } from '../../datamodel/recipe-editing-history';

@Component({
    selector: 'app-editable-ingredient-list',
    templateUrl: './editable-ingredient-list.component.html',
    styleUrls: ['./editable-ingredient-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableIngredientListComponent {
    @Output() private editingHistoryChange: EventEmitter<RecipeEditingHistory> = new EventEmitter();

    @Input() public ingredientMaxQuantity = 300;
    public readonly ingredients: MergeableMap<Ingredient, Quantity> = new MergeableMap<Ingredient, Quantity>();

    private _editingHistory: RecipeEditingHistory;

    @Input() public set editingHistory(history: RecipeEditingHistory) {
        this._editingHistory = history.clone();
        this.ingredients.mergeWithMissingValuesDeleting(history.recipeRelativeToProfile.quantifiedIngredients);
    }

    public canUndo(): boolean {
        return this._editingHistory.canUndo();
    }

    public canRedo(): boolean {
        return this._editingHistory.canRedo();
    }

    /**
     * @description Undo the last modification of the recipe
     */
    public undo() {
        this._editingHistory.undo();
        this.triggerEditingHistoryChange();
    }

    /**
     * @description Redo the last modification of the recipe
     */
    public redo() {
        this._editingHistory.redo();
        this.triggerEditingHistoryChange();
    }

    public addNewIngredient(ingedient: Ingredient): void {
        this._editingHistory.addIngredient(ingedient);
        this.triggerEditingHistoryChange();
    }

    /**
     * @description Sets a new quantity for the edited ingredient
     * @param ingredient the ingredient that is edited
     * @param quantity: the new quantity
     */
    public setIngredientQuantity(ingredient: Ingredient, quantity: Quantity) {
        this._editingHistory.setIngredientQuantity(
            ingredient,
            new Quantity(quantity.quantityInGrams)
        );
        this.triggerEditingHistoryChange();
    }

    /**
     * @description Sets a new quantity for the edited ingredient, without saving the new recipe status in the history
     * @param ingredient the ingredient that is edited
     * @param quantity: the new quantity
     */
    public setIngredientTemporaryQuantity(ingredient: Ingredient, quantity: Quantity) {
        this._editingHistory.setIngredientTemporaryQuantity(ingredient, quantity);
        this.triggerEditingHistoryChange();
    }

    /**
     * @description Removes the edited ingredient from the ingredient list
     * @param ingredient the ingredient to remove
     */
    public removeIngredient(ingredient: Ingredient): void {
        this._editingHistory.removeIngredient(ingredient);
        this.triggerEditingHistoryChange();
    }

    private triggerEditingHistoryChange(): void {
        this.editingHistoryChange.emit(this._editingHistory);
    }
}
