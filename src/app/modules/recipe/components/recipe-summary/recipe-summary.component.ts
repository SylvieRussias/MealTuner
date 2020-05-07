import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Recipe } from '../../datamodel/recipe';

@Component({
    selector: 'app-recipe-summary',
    templateUrl: './recipe-summary.component.html',
    styleUrls: ['./recipe-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeSummaryComponent {
    @Input() recipe: Recipe;
}
