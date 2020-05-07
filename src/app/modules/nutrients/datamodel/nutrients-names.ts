export enum NutrientsNames {
    Carbohydrate,
    Sugars,
    Protein,
    Fat,
    SaturatedFat
}

export namespace NutrientsNames {

    export function getAllEnumValues(): number[] {
        const allNutrients: NutrientsNames[] = [];
        for (let objectKey in NutrientsNames) {
            if (!isNaN(Number(objectKey))) {
                allNutrients.push(Number(objectKey));
            }
        }
        return allNutrients;
    }
}