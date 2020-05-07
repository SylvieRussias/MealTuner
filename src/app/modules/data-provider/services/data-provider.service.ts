import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientSummary } from '../datamodel/ingredient-summary';
import { Ingredient } from '../../recipe/datamodel/ingredient';
import { DataProvider } from '../datamodel/data-provider';
import { HttpClient } from '@angular/common/http';
import { ApiProviderFoodDataCentral } from '../datamodel/api-provider-food-data-central';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    private dataProvider: DataProvider;

    constructor(httpClient: HttpClient) {
        this.dataProvider = new ApiProviderFoodDataCentral(httpClient);
    }

    /**
     * @description Fetches the summaries ingredients matching a text
     */
    public fetchSummaryOfIngredientsMatchingText(text: string): Observable<IngredientSummary[]> {
        return this.dataProvider.fetchSummaryOfIngredientsMatchingText(text);
    }

    /**
     * @description Fetches the details of an ingredient
     * @param ingredientSummary: the summary of the ingredient, as fetched from the API
     */
    public fetchIngredientDetails(ingredientSummary: IngredientSummary): Observable<Ingredient> {
        return this.dataProvider.fetchIngredientDetails(ingredientSummary);
    }

}
