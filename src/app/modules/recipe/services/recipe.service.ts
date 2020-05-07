import { ConfirmDialogOutput } from '../../ui-elements/components/confirm-dialog/confirm-dialog.component';
import { DialogService } from '../../ui-elements/services/dialog.service';
import { Injectable } from '@angular/core';
import { RecipeEditingHistory } from '../datamodel/recipe-editing-history';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecipeStorageService } from './recipe-storage.service';
import { Recipe } from '../datamodel/recipe';
import { ClonableRecipe } from '../datamodel/editable-recipe';
import { RecipeJsonMapper } from '../datamodel/recipe-json-mapper';
import { ConfirmDialogInput } from '../../ui-elements/components/confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    public readonly currentlyEditedRecipe$: Observable<RecipeEditingHistory>;
    private readonly currentlyEditedRecipe: BehaviorSubject<RecipeEditingHistory>;

    public readonly hasUnsavedChanges$: Observable<boolean>;
    private readonly hasUnsavedChanges: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private isCurrentRecipeLoadedFromSave: boolean = false;
    private lastSaveOfCurrentlyEditedRecipe: Recipe;

    constructor(private recipeStorageService: RecipeStorageService,
        private dialogService: DialogService
    ) {
        this.currentlyEditedRecipe = new BehaviorSubject(new RecipeEditingHistory(null, null));
        this.currentlyEditedRecipe$ = this.currentlyEditedRecipe.asObservable();
        this.hasUnsavedChanges$ = this.hasUnsavedChanges.asObservable();
        this.recipeStorageService.savedRecipes$.subscribe(() => this.hasUnsavedChanges.next(false));
    }

    public setCurrentEditionHistory(history: RecipeEditingHistory): void {
        this.currentlyEditedRecipe.next(history);
        this.updateHasUnsavedChanges();
    }

    public saveCurrentRecipe(): void {
        const editingHistory = this.currentlyEditedRecipe.value;
        const currentRecipe: Recipe = editingHistory.recipeRelativeToProfile;
        this.saveAfterNoAccidentalOverwriteCheck(currentRecipe);
    }

    public createNewRecipe(): void {
        this.isCurrentRecipeLoadedFromSave = false;
        this.setNewCurrentRecipe(new RecipeEditingHistory());
    }

    public loadRecipe(recipe: Recipe): void {
        this.isCurrentRecipeLoadedFromSave = true;
        const editableRecipe: ClonableRecipe = new ClonableRecipe(recipe.name, recipe.description, recipe.quantifiedIngredients);
        const newEditionHistory: RecipeEditingHistory = new RecipeEditingHistory(null, editableRecipe);
        this.setNewCurrentRecipe(newEditionHistory);
    }

    public canLeaveCurrentRecipe(): Observable<boolean> {
        const canLeaveRecipe: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
        const canLeaveRecipe$: Observable<boolean> = canLeaveRecipe.asObservable();
        const hasUnsavedChanges = this.hasUnsavedChanges.value;
        if (hasUnsavedChanges) {
            this.confirmLeaveWithUnsavedChanges(canLeaveRecipe);
        } else {
            canLeaveRecipe.next(true);
        }
        return canLeaveRecipe$;
    }

    private getCurrentRecipe(): Recipe {
        return this.currentlyEditedRecipe.value.recipeRelativeToProfile;
    }

    private saveAfterNoAccidentalOverwriteCheck(recipe: Recipe): void {
        if (this.hasCurrentlyEditedRecipeBeenCreatedDuringThisSession()) {
            this.recipeStorageService.saveWithAlreadyTakenFileNameCheck(recipe);
        } else {
            this.recipeStorageService.save(recipe);
        }
    }

    private hasCurrentlyEditedRecipeBeenCreatedDuringThisSession(): boolean {
        return !this.isCurrentRecipeLoadedFromSave;
    }

    private setNewCurrentRecipe(newEditionHistory: RecipeEditingHistory): void {
        this.updateLastSaveOfCurrentlyEditedRecipe(newEditionHistory);
        this.currentlyEditedRecipe.next(newEditionHistory);
    }

    private updateLastSaveOfCurrentlyEditedRecipe(editingHistoryOfCurrentlyEditedRecipe: RecipeEditingHistory) {
        this.lastSaveOfCurrentlyEditedRecipe = editingHistoryOfCurrentlyEditedRecipe.recipeRelativeToProfile;
        this.hasUnsavedChanges.next(false);
    }

    private updateHasUnsavedChanges(): void {
        const isCurrentRecipeSameAsSave = RecipeJsonMapper.recipeDeepEquals(
            this.getCurrentRecipe(),
            this.lastSaveOfCurrentlyEditedRecipe
        );
        this.hasUnsavedChanges.next(!isCurrentRecipeSameAsSave);
    }

    private confirmLeaveWithUnsavedChanges(canLeaveRecipe: BehaviorSubject<boolean>): void {
        this.dialogService.openConfirmDialog(this.getLeavePageDialogConfig())
            .pipe(take(1)).subscribe((response: ConfirmDialogOutput) => {
                canLeaveRecipe.next(response && response.hasConfirmed)
            });
    }

    private getLeavePageDialogConfig(): ConfirmDialogInput {
        const dialogInput: ConfirmDialogInput = {
            question: 'Leave without saving ?',
            confirmText: 'Leave'
        }
        return dialogInput;
    }
}
