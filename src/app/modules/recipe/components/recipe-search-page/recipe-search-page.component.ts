import { RecipeStorageService } from './../../services/recipe-storage.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../datamodel/recipe';
import { FormControl } from '@angular/forms';
import { ButtonSmallComponent } from '../../../ui-elements/components/button-small/button-small.component';

@Component({
    selector: 'app-recipe-search-page',
    templateUrl: './recipe-search-page.component.html',
    styleUrls: ['./recipe-search-page.component.scss']
})
export class RecipeSearchPageComponent implements OnInit, OnDestroy {
    @Output() private selectRecipe: EventEmitter<Recipe> = new EventEmitter();
    @Output() private startNewRecipe: EventEmitter<any> = new EventEmitter();

    public filteredRecipes: Recipe[];
    public searchText: FormControl = new FormControl('');
    public readonly startNewRecipeButtonStyle = ButtonSmallComponent.Styles.MainColorBackground;
    public readonly startNewRecipeButtonSize = ButtonSmallComponent.Sizes.Larger;

    private _allRecipes: Recipe[];
    private allRecipesSubscription: Subscription;

    constructor(private recipeStorageService: RecipeStorageService) { }

    ngOnInit() {
        this.allRecipesSubscription = this.recipeStorageService.savedRecipes$.subscribe((recipes: Recipe[]) => {
            this.allRecipes = recipes;
        });
        this.recipeStorageService.loadAllSavedRecipe();
    }

    ngOnDestroy() {
        this.allRecipesSubscription.unsubscribe();
    }

    public filter(): void {
        const searchString: string = this.searchText.value;
        this.filteredRecipes = this._allRecipes.filter(
            (recipe: Recipe) => this.isMatchingSearch(recipe.name, searchString)
        );
    }

    public confirmRecipeSelection(recipe: Recipe): void {
        this.selectRecipe.next(recipe);
    }

    public startNewRecipeButtonClicked(): void {
        this.startNewRecipe.emit();
    }

    private set allRecipes(recipes: Recipe[]) {
        this._allRecipes = recipes;
        this.filter();
    }

    private isMatchingSearch(stringToTest: string, search: string): boolean {
        search = this.normalizeString(search);
        stringToTest = this.normalizeString(stringToTest);

        const isSearchEmpty: boolean = (!search);
        const doesStringToTestContainSearch = stringToTest.includes(search);

        return isSearchEmpty || doesStringToTestContainSearch;
    }

    private normalizeString(stringToNormalize: string): string {
        return stringToNormalize.toLowerCase().trim();
    }
}
