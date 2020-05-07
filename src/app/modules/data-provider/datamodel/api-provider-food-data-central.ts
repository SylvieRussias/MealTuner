import { Ingredient } from './../../recipe/datamodel/ingredient';
import * as API_CONFIG from '../../../../assets/config/api-access-food-data-central.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataProvider } from './data-provider';
import { IngredientSummary } from './ingredient-summary';
import { map, take } from 'rxjs/operators';
import { FoodNutrients } from '../../nutrients/datamodel/food-nutrients';
import { NutrientsNames } from '../../nutrients/datamodel/nutrients-names';

export class ApiProviderFoodDataCentral extends DataProvider {

    private readonly API_URL = API_CONFIG.url;
    private readonly API_KEY = API_CONFIG["api-key"];
    private readonly API_KEY_PARAM = 'api_key=' + this.API_KEY;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public fetchSummaryOfIngredientsMatchingText(searchText: string): Observable<IngredientSummary[]> {
        const query = this.formatFetchSummaryQuery(searchText);
        return this.httpClient.get(query)
            .pipe(
                take(1)
            ).pipe(
                map((response: ApiProviderFoodDataCentral.FoodListResponse) =>
                    this.formatSummaryOfIngredientsSearchResponse(response))
            );
    }

    public fetchIngredientDetails(ingredientSummary: IngredientSummary): Observable<Ingredient> {
        const query = this.formatFetchDetailsQuery(ingredientSummary.idInApi);
        return this.httpClient.get(query)
            .pipe(
                take(1)
            ).pipe(
                map((response: ApiProviderFoodDataCentral.FoodDetailsResponse) => {
                    return this.formatIngredientDetailsResponse(response);
                })
            );
    }

    private formatFetchSummaryQuery(searchText: string): string {
        return this.API_URL + 'foods/search?' + this.API_KEY_PARAM + '\&query=' + searchText;
    }

    private formatFetchDetailsQuery(ingredientId: string): string {
        return this.API_URL + 'food/' + ingredientId + '?' + this.API_KEY_PARAM;
    }

    private formatSummaryOfIngredientsSearchResponse(
        response: ApiProviderFoodDataCentral.FoodListResponse
    ): IngredientSummary[] {
        const rawList = this.getIngredientSummaries(response);
        const uniquesList = this.getUniquesIngredientsSummaries(rawList);
        const sortedList = this.getSortedByRawFirstAndShortestNameFisrt(uniquesList);
        return sortedList;
    }

    private getIngredientSummaries(
        response: ApiProviderFoodDataCentral.FoodListResponse
    ): IngredientSummary[] {
        return response.foods.map((food: ApiProviderFoodDataCentral.FoodListFoodItem) =>
            this.getFoodSummary(food)
        );
    }

    private getFoodSummary(food: ApiProviderFoodDataCentral.FoodListFoodItem): IngredientSummary {
        return new IngredientSummary(
            food.fdcId,
            this.toLowerCaseWithFirstLetterUpperCase(food.description)
        )
    }

    private getUniquesIngredientsSummaries(ingredientsSummaries: IngredientSummary[]): IngredientSummary[] {
        const uniques: IngredientSummary[] = [];
        const uniquesAlreadyRegisteredIngredientsNames: Set<string> = new Set<string>();
        for (const summary of ingredientsSummaries) {
            const ingredientName = summary.name;
            if (!uniquesAlreadyRegisteredIngredientsNames.has(ingredientName)) {
                uniques.push(summary);
                uniquesAlreadyRegisteredIngredientsNames.add(ingredientName);
            }
        }
        return uniques;
    }

    /**
     * Sorts in order to have all:
     * - first: raw ingredients sorted by shortest name 
     * - then: all not raw ingredients sorted by shortest name
     */
    private getSortedByRawFirstAndShortestNameFisrt(ingredientsToSort: IngredientSummary[]): IngredientSummary[] {
        return ingredientsToSort.sort((ingredientA: IngredientSummary, ingredientB: IngredientSummary) => {
            const isARaw = this.isIngredientRaw(ingredientA);
            const isBRaw = this.isIngredientRaw(ingredientB);
            const isANameLonger = ingredientA.name.length > ingredientB.name.length;
            if (isARaw && !isBRaw) {
                return -1;
            } else if (!isARaw && isBRaw) {
                return 1;
            } else {
                return isANameLonger ? 1 : -1;
            }
        });
    }

    private isIngredientRaw(ingredient: IngredientSummary): boolean {
        return ingredient.name.endsWith(', raw');
    }

    private formatIngredientDetailsResponse(response: ApiProviderFoodDataCentral.FoodDetailsResponse): Ingredient {
        const ingredientName = this.toLowerCaseWithFirstLetterUpperCase(response.description);
        const ingredientNutrients: FoodNutrients = this.formatFoodNutrients(response.foodNutrients);
        return new Ingredient(ingredientName, ingredientNutrients);
    }

    private formatFoodNutrients(response: ApiProviderFoodDataCentral.FoodDetailsNutrient[]): FoodNutrients {
        const nutrients: Map<NutrientsNames, number> = new Map();
        for (const nutrient of response) {
            const nutrientName = this.formatNutrientName(this.getNutrientName(nutrient));
            if (nutrientName != null) {
                const quantity = this.getNutrientQuantityInGrams(nutrient);
                nutrients.set(nutrientName, quantity);
            }
        }
        return new FoodNutrients(nutrients, 100);
    }

    private getNutrientName(nutrient: ApiProviderFoodDataCentral.FoodDetailsNutrient): string {
        return nutrient.nutrient.name;
    }

    private getNutrientQuantityInGrams(nutrient: ApiProviderFoodDataCentral.FoodDetailsNutrient): number {
        let quantity: number;
        switch (nutrient.nutrient.unitName) {
            case "g": quantity = nutrient.amount;
                break;
            case "mg": quantity = nutrient.amount / 1000;
                break;
        }
        return quantity;
    }

    /**
     * @description Formats a nutrient name as received from the API into a NutrientsNames. 
     * Returns null if no matching found
     */
    private formatNutrientName(nameToFormat: string): NutrientsNames {
        let result: NutrientsNames;
        switch (nameToFormat) {
            case "Protein":
                result = NutrientsNames.Protein;
                break;
            case "Total lipid (fat)":
                result = NutrientsNames.Fat;
                break;
            case "Carbohydrate, by difference":
                result = NutrientsNames.Carbohydrate;
                break;
            case "Sugars, total including NLEA":
                result = NutrientsNames.Sugars;
                break;
            case "Fatty acids, total saturated":
                result = NutrientsNames.SaturatedFat;
                break;
            default: result = null;
        }
        return result;
    }

    private toLowerCaseWithFirstLetterUpperCase(string: string): string {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
}

export namespace ApiProviderFoodDataCentral {
    export class FoodListResponse {
        foods: FoodListFoodItem[];
    }

    export class FoodListFoodItem {
        fdcId: string;
        description: string;
        dataType: string;
        ingredients: string;
    }

    export class FoodDetailsResponse {
        foodClass: string;
        description: string;
        foodNutrients: FoodDetailsNutrient[];
        ingredients: string;
        servingSize: number;
        servingSizeUnit: string;
        labelNutrients: FoodLabelNutrients;
        dataType: string;
    }

    export class FoodDetailsNutrient {
        type: string
        id: number
        nutrient: { id: number, number: string, name: string, rank: number, unitName: string }
        foodNutrientDerivation: any;
        amount: number;
    }

    export class FoodLabelNutrients {
        fat: { value: number }
        saturatedFat: { value: number }
        transFat: { value: number }
        cholesterol: { value: number }
        sodium: { value: number }
        carbohydrates: { value: number }
        fiber: { value: number }
        sugars: { value: number }
        protein: { value: number }
        calcium: { value: number }
        iron: { value: number }
        calories: { value: number }
    }
}
