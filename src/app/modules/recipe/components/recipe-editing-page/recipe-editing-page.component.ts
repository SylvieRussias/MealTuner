import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipeEditingHistory } from '../../datamodel/recipe-editing-history';
import { RecipeEditingService } from '../../services/recipe-editing.service';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-recipe-editing-page',
    templateUrl: './recipe-editing-page.component.html',
    styleUrls: ['./recipe-editing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditingPageComponent implements OnInit, OnDestroy {
    public editingHistory$: Observable<RecipeEditingHistory>;

    private editingHistory: RecipeEditingHistory;
    private editingHistorySubscription: Subscription;

    constructor(private recipeEditingService: RecipeEditingService) { }

    ngOnInit() {
        this.editingHistorySubscription = this.recipeEditingService.currentlyEditedRecipe$.subscribe(
            (editingHistory: RecipeEditingHistory) =>
                this.editingHistory = editingHistory.clone()
        );
        this.editingHistory$ = this.recipeEditingService.currentlyEditedRecipe$;
    }

    ngOnDestroy() {
        this.editingHistorySubscription.unsubscribe();
    }

    public saveUpdatedEdtidingHistory(newHistory: RecipeEditingHistory): void {
        this.triggerEditingHistoryChange(newHistory);
    }

    public setNewRecipeTitle(newTitle: string): void {
        this.editingHistory.setRecipeName(newTitle);
        this.triggerEditingHistoryChange(this.editingHistory);
    }

    public setNewRecipeDescription(newDescription: string): void {
        this.editingHistory.setRecipeDescription(newDescription);
        this.triggerEditingHistoryChange(this.editingHistory);
    }

    private triggerEditingHistoryChange(newHistory: RecipeEditingHistory): void {
        this.recipeEditingService.setCurrentEditionHistory(newHistory);
    }
}
