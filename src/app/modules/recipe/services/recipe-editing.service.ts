import { Observable, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeEditingHistory } from '../datamodel/recipe-editing-history';
import { RecipeService } from './recipe.service';
import { NutrientsProfileService } from '../../nutrients/services/nutrients-profile.service';
import { map } from 'rxjs/operators';
import { Profile } from '../../nutrients/datamodel/profile';

@Injectable({
    providedIn: 'root'
})
export class RecipeEditingService {

    public readonly currentlyEditedRecipe$: Observable<RecipeEditingHistory>;

    constructor(private recipeService: RecipeService,
        private nutrientsProfileService: NutrientsProfileService
    ) {
        this.currentlyEditedRecipe$ = this.getRecipeRelativeToProfileObservable();
    }

    public setCurrentEditionHistory(history: RecipeEditingHistory): void {
        const normalizedEditingHistory = history.toHistoryRelativeToReferenceProfile();
        this.recipeService.setCurrentEditionHistory(normalizedEditingHistory);
    }

    private getRecipeRelativeToProfileObservable(): Observable<RecipeEditingHistory> {
        return combineLatest(
            this.recipeService.currentlyEditedRecipe$,
            this.nutrientsProfileService.profile$
        ).pipe(
            map(
                ([recipeEditingHistory, profile]: [RecipeEditingHistory, Profile]) =>
                    recipeEditingHistory.toHistoryRelativeToProfile(profile)
            )
        );
    }
}
