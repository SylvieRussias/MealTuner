import { Ingredient } from './../../datamodel/ingredient';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonStandardComponent } from '../../../ui-elements/components/button-standard/button-standard.component';
import { NutrientsNames } from '../../../nutrients/datamodel/nutrients-names';

@Component({
    templateUrl: './ingredient-details-dialog.component.html',
    styleUrls: ['./ingredient-details-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientDetailsDialogComponent {

    public readonly buttonsStyle = ButtonStandardComponent.Shape.Rectangle;
    public allNutrients: NutrientsNames[];
    public ingredientName: string;

    constructor(
        public dialogRef: MatDialogRef<IngredientDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public inputIngredient: Ingredient
    ) {
        this.allNutrients = inputIngredient.nutrientsNames;
        this.ingredientName = inputIngredient.name;
    }

    public getNutrientDisplayString(nutrient: NutrientsNames): string {
        return NutrientsNames[nutrient];
    }

    public getNutrientQuantityPer100g(nutrient: NutrientsNames): number {
        return this.inputIngredient.getNutrientQuantity(nutrient) * 100;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
