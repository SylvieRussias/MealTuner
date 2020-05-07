import { DialogService } from './../../ui-elements/services/dialog.service';
import { ConfirmDialogOutput, ConfirmDialogInput } from '../../ui-elements/components/confirm-dialog/confirm-dialog.component';
import { LocalStorageService } from '../../data-provider/services/local-storage.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../datamodel/recipe';
import { Observable, BehaviorSubject } from 'rxjs';
import { RecipeJsonMapper } from '../datamodel/recipe-json-mapper';
import { take, map } from 'rxjs/operators';
import { ClonableRecipe } from '../datamodel/editable-recipe';
import * as BREAKFAST from '../../../../assets/recipes/breakfast.json';
import * as EASY_PIZZA from '../../../../assets/recipes/easy-pizza.json';

@Injectable({
    providedIn: 'root'
})
export class RecipeStorageService {
    public readonly savedRecipes$: Observable<Recipe[]>;

    private readonly savedRecipesByName: BehaviorSubject<Map<string, Recipe>> = new BehaviorSubject(new Map());
    private static readonly RECEIPE_STORAGE_FOLDER = 'recipe/';

    constructor(private localStorageService: LocalStorageService,
        private dialogService: DialogService
    ) {
        this.savedRecipes$ = this.savedRecipesByName.asObservable().pipe(map(
            (savedRecipesByName: Map<string, Recipe>) => Array.from(savedRecipesByName.values())
        ));
        this.loadExampleRecipes();
        this.loadAllSavedRecipe();
    }

    public loadAllSavedRecipe() {
        this.localStorageService.loadFolder(RecipeStorageService.RECEIPE_STORAGE_FOLDER).subscribe(
            (jsonRecipes: any[]) => {
                const recipes: Recipe[] = jsonRecipes.map(
                    recipe => RecipeJsonMapper.formatJsonToRecipe(recipe)
                )
                this.addLoadedRecipesToSavedRecipesList(recipes);
            },
            error => console.error(error)
        );
    }

    public saveWithAlreadyTakenFileNameCheck(recipe: Recipe): void {
        if (this.isRecipeNameAlreadyUsed(recipe)) {
            this.openOverwriteDialog(recipe);
        } else {
            this.save(recipe);
        }
    }

    public save(recipe: Recipe): void {
        const filePath: string = this.buildFullFilePath(recipe);
        const objectToSave: any = RecipeJsonMapper.formatRecipeToJson(recipe);
        this.localStorageService.saveFile(filePath, objectToSave).subscribe(
            rep => this.updateSavedRecipeList(),
            err => console.error(err)
        );
    }

    private openOverwriteDialog(recipe: Recipe): void {
        const dialogConfig: ConfirmDialogInput = this.getOverwriteDialogConfig(recipe);
        this.dialogService.openConfirmDialog(dialogConfig).pipe(take(1))
            .subscribe((response: ConfirmDialogOutput) =>
                this.handleOverwriteDialogResponse(response, recipe)
            );
    }

    private getOverwriteDialogConfig(recipe: Recipe): ConfirmDialogInput {
        const dialogInput: ConfirmDialogInput = {
            question: '"' + recipe.name + '" already exists. Overwrite ?',
            confirmText: 'Overwrite'
        }
        return dialogInput;
    }

    private handleOverwriteDialogResponse(result: ConfirmDialogOutput, recipe: Recipe): void {
        if (result.hasConfirmed) {
            this.save(recipe);
        }
    }

    private isRecipeNameAlreadyUsed(recipe: Recipe): boolean {
        const nameAlreadyUsed = this.savedRecipesByName.value.has(recipe.name);
        return nameAlreadyUsed;
    }

    private buildFullFilePath(recipe: Recipe): string {
        return RecipeStorageService.RECEIPE_STORAGE_FOLDER + recipe.name;
    }

    private updateSavedRecipeList(): void {
        this.loadAllSavedRecipe();
    }

    private loadExampleRecipes(): void {
        const recipes: Recipe[] = [];
        recipes.push(RecipeStorageService.loadRecipeFromJson(BREAKFAST));
        recipes.push(RecipeStorageService.loadRecipeFromJson(EASY_PIZZA));
        this.addLoadedRecipesToSavedRecipesList(recipes);
    }

    private static loadRecipeFromJson(json: any): ClonableRecipe {
        return RecipeJsonMapper.formatJsonToRecipe(
            this.getJsonModuleAsJson(json)
        );
    }

    /**
     * @description Gets the property 'default' of json asset because it's the actual json 
     * (as the asset itself would be considered as a module by other classes)
     */
    private static getJsonModuleAsJson(jsonModule: any): any {
        return (jsonModule as any).default;
    }

    private addLoadedRecipesToSavedRecipesList(loadedRecipes: Recipe[]): void {
        const recipes: Map<string, Recipe> = this.savedRecipesByName.value;
        for (const recipe of loadedRecipes) {
            recipes.set(recipe.name, recipe);
        }
        this.savedRecipesByName.next(recipes);
    }
}
