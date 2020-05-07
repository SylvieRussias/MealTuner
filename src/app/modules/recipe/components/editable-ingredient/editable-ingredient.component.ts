import { DialogService } from './../../../ui-elements/services/dialog.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Ingredient } from '../../datamodel/ingredient';
import { Quantity } from '../../datamodel/quantity';
import { Interval } from 'src/app/modules/ui-elements/datamodel/interval';
import { ButtonSmallComponent } from '../../../ui-elements/components/button-small/button-small.component';
import { IngredientDetailsDialogComponent } from '../ingredient-details-dialog/ingredient-details-dialog.component';

@Component({
    selector: 'app-editable-ingredient',
    templateUrl: './editable-ingredient.component.html',
    styleUrls: ['./editable-ingredient.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableIngredientComponent {
    @Input() public quantity: Quantity;
    @Output() private quantityChange: EventEmitter<Quantity> = new EventEmitter();
    @Output() private quantityChangeTemp: EventEmitter<Quantity> = new EventEmitter();
    @Output() private ingredientRemoved: EventEmitter<any> = new EventEmitter();

    public _ingredient: Ingredient;
    public possibleValuesInterval: Interval;
    public readonly showMoreButtonStyle = ButtonSmallComponent.Styles.BlackNoBorder;
    public readonly removeButtonSize = ButtonSmallComponent.Sizes.Smaller;

    constructor(private dialogService: DialogService) { }

    @Input() public set ingredient(ingredient: Ingredient) {
        this._ingredient = ingredient;
    }

    @Input() public set maxQuantity(maxQuantity: number) {
        this.possibleValuesInterval = new Interval(0, maxQuantity);
    }

    public isRemoveButtonEnabled(): boolean {
        return this.quantity.quantityInGrams === 0;
    }

    public setIngredientQuantity(quantityInGrams: number) {
        const newQuantity = new Quantity(quantityInGrams);
        this.quantityChange.emit(newQuantity);
    }

    public setIngredientTemporaryQuantity(tempQuantityInGrams: number) {
        const newQuantity = new Quantity(tempQuantityInGrams);
        this.quantityChangeTemp.emit(newQuantity);
    }

    public removeIngredient(): void {
        this.ingredientRemoved.emit();
    }

    public showIngredientDetails(): void {
        this.dialogService.openDialog(IngredientDetailsDialogComponent, this._ingredient);
    }
}
