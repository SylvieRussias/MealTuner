import { Ingredient } from './../datamodel/ingredient';
import { IngredientSummary } from './../../data-provider/datamodel/ingredient-summary';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataProviderService } from '../../data-provider/services/data-provider.service';

@Injectable({
    providedIn: 'root'
})
export class AddNewIngredientService {

    public readonly ingredientsMatchingSearchText$: Observable<IngredientSummary[]>;

    private readonly ingredientsMatchingSearchText: BehaviorSubject<IngredientSummary[]>
        = new BehaviorSubject<IngredientSummary[]>([]);

    constructor(private dataProviderService: DataProviderService) {
        this.ingredientsMatchingSearchText$ = this.ingredientsMatchingSearchText.asObservable();
    }

    public searchForIngredientsMatchingText(text: string): void {
        this.dataProviderService.fetchSummaryOfIngredientsMatchingText(text).subscribe(
            (results: IngredientSummary[]) => this.ingredientsMatchingSearchText.next(results)
        );
    }

    public fetchIngredientDetails(ingredientSummary: IngredientSummary): Observable<Ingredient> {
        return this.dataProviderService.fetchIngredientDetails(ingredientSummary);
    }
}
