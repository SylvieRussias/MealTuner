import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NutrientsNames } from '../../datamodel/nutrients-names';
import { QualityIntervals } from '../../../ui-elements/datamodel/quality-intervals';
import { Interval } from 'src/app/modules/ui-elements/datamodel/interval';
import { NutrientsQuantitiesTarget } from '../../datamodel/nutrients-quantities-target';
import { QuantityTarget } from '../../datamodel/quantity-target';

@Component({
    selector: 'app-nutrient',
    templateUrl: './nutrient.component.html',
    styleUrls: ['./nutrient.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NutrientComponent {
    @Input() public nutrientName: NutrientsNames;
    @Input() public quantity: number;

    public nutrientQuantityIntervals: QualityIntervals;
    private static readonly MAX_VISIBLE_VALUE_ON_MAX_VALUE_RATION = 1.4;

    @Input() public set nutrientsQuantitiestarget(nutrientsQuantitiesTarget: NutrientsQuantitiesTarget) {
        const target: QuantityTarget = nutrientsQuantitiesTarget.nutrients.get(this.nutrientName);
        this.nutrientQuantityIntervals = this.buildNewInterval(target);
    }

    public getNutrientDisplayString(nutrient: NutrientsNames): string {
        return NutrientsNames[nutrient];
    }

    private buildNewInterval(newTarget: QuantityTarget): QualityIntervals {
        return new QualityIntervals(
            new Interval(0, NutrientComponent.MAX_VISIBLE_VALUE_ON_MAX_VALUE_RATION * newTarget.maxValue),
            new Interval(newTarget.minValue, newTarget.maxValue),
            new Interval(newTarget.optimum, newTarget.optimum)
        );
    }
}
