import { Observable } from 'rxjs';
import { Ingredient } from '../../recipe/datamodel/ingredient';
import { IngredientSummary } from './ingredient-summary';
import { HttpClient } from '@angular/common/http';

export abstract class DataProvider {

    constructor(protected httpClient: HttpClient) { }

    /**
     * @description Fetches the summaries ingredients matching a text.
     */
    public abstract fetchSummaryOfIngredientsMatchingText(text: string): Observable<IngredientSummary[]>;

    /**
     * @description Fetches the details of an ingredient
     * @param ingredientSummary: the summary of the ingredient, as fetched from the API
     */
    public abstract fetchIngredientDetails(ingredientSummary: IngredientSummary): Observable<Ingredient>;

}