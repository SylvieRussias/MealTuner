import { NutrientsQuantitiesTarget } from './nutrients-quantities-target';
import * as REFERENCE_NUTRIENTS_JSON from '../../../../assets/config/reference-daily-nutrients.json';
import { NutrientsNames } from './nutrients-names';
import { QuantityTarget } from './quantity-target';

export class NutrientReferenceJsonMapper {

    public static getReferenceConfig(): NutrientsQuantitiesTarget {
        const configJson = (REFERENCE_NUTRIENTS_JSON as any).default;
        return this.formatJsonToNutrientsQuantities(configJson);
    }

    private static formatJsonToNutrientsQuantities(json: any): NutrientsQuantitiesTarget {
        const quantityByIngredient = this.getNutrientsTargetsFromJson(json);
        return new NutrientsQuantitiesTarget(quantityByIngredient);
    }

    private static getNutrientsTargetsFromJson(json: any): Map<NutrientsNames, QuantityTarget> {
        const quantityByIngredient: Map<NutrientsNames, QuantityTarget> = new Map();

        quantityByIngredient.set(NutrientsNames.Carbohydrate, new QuantityTarget(json.Carbohydrate));
        quantityByIngredient.set(NutrientsNames.Sugars, new QuantityTarget(json.Sugar));
        quantityByIngredient.set(NutrientsNames.Protein, new QuantityTarget(json.Protein));
        quantityByIngredient.set(NutrientsNames.Fat, new QuantityTarget(json.Fat));
        quantityByIngredient.set(NutrientsNames.SaturatedFat, new QuantityTarget(json.SaturatedFat));

        return quantityByIngredient;
    }
}