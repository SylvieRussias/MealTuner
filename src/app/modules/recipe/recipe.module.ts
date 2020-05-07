import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableIngredientComponent } from './components/editable-ingredient/editable-ingredient.component';
import { EditableRecipeComponent } from './components/editable-recipe/editable-recipe.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { RecipeEditingPageComponent } from './components/recipe-editing-page/recipe-editing-page.component';
import { EditableIngredientListComponent } from './components/editable-ingredient-list/editable-ingredient-list.component';
import { NutrientsModule } from '../nutrients/nutrients.module';
import { AddNewIngredientComponent } from './components/add-new-ingredient/add-new-ingredient.component';
import { DataProviderModule } from '../data-provider/data-provider.module';
import { RecipeSearchPageComponent } from './components/recipe-search-page/recipe-search-page.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { IngredientDetailsDialogComponent } from './components/ingredient-details-dialog/ingredient-details-dialog.component';

@NgModule({
    declarations: [
        EditableIngredientComponent,
        EditableRecipeComponent,
        RecipeEditingPageComponent,
        EditableIngredientListComponent,
        AddNewIngredientComponent,
        RecipeSearchPageComponent,
        RecipeSummaryComponent,
        IngredientDetailsDialogComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        DataProviderModule,
        UiElementsModule,
        NutrientsModule,
    ],
    exports: [
        RecipeEditingPageComponent,
        RecipeSearchPageComponent
    ],
})
export class RecipeModule { }
