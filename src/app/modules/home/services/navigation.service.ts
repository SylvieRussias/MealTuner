import { DialogService } from './../../ui-elements/services/dialog.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppPages } from '../datamodel/app-pages';
import { Recipe } from '../../recipe/datamodel/recipe';
import { RecipeService } from '../../recipe/services/recipe.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public readonly currentPage$: Observable<AppPages>;

    private readonly currentPage: BehaviorSubject<AppPages>
        = new BehaviorSubject(undefined);

    constructor(private recipeService: RecipeService,
        private dialogService: DialogService
    ) {
        this.currentPage$ = this.currentPage.asObservable();
        this.goToPage(AppPages.SearchRecipe);
    }

    public startNewRecipe(): void {
        this.recipeService.createNewRecipe();
        this.goToPage(AppPages.RecipeEditing);
    }

    public openRecipe(recipe: Recipe): void {
        this.recipeService.loadRecipe(recipe);
        this.goToPage(AppPages.RecipeEditing);
    }

    public goToPage(page: AppPages): void {
        this.setCurrentPage(page);
    }

    private setCurrentPage(newCurrentPage: AppPages): void {
        if (AppPages.isPopUpPage(newCurrentPage)) {
            this.openPopUpPage(newCurrentPage);
        } else {
            this.navigateToPage(newCurrentPage);
        }
    }

    private openPopUpPage(page: AppPages): void {
        const pageComponentType = AppPages.getPopUpPageComponentType(page);
        this.dialogService.openDialog(pageComponentType);
    }

    private navigateToPage(page: AppPages): void {
        this.currentPage.next(page);
    }
}
