import { NutrientsQuantitiesTarget } from './nutrients-quantities-target';
import { NutrientReferenceJsonMapper } from './nutrient-reference-json-mapper';

export class Profile {
    private _numberOfPeople: number;
    private _ratioOfDailyPortion: number;
    private _nutrientsQuantitiesTarget: NutrientsQuantitiesTarget;

    private static readonly referenceTargetPerPersonPerDay: NutrientsQuantitiesTarget
        = NutrientReferenceJsonMapper.getReferenceConfig();

    constructor(numberOfPeople?: number, ratioOfDailyPortion?: number) {
        this._numberOfPeople = numberOfPeople ? numberOfPeople : 1;
        this._ratioOfDailyPortion = ratioOfDailyPortion ? ratioOfDailyPortion : 1;
        this._nutrientsQuantitiesTarget
            = this.calculateNutrients(numberOfPeople, ratioOfDailyPortion);
    }

    public get numberOfPeople(): number {
        return this._numberOfPeople;
    }

    public get ratioOfDailyPortion(): number {
        return this._ratioOfDailyPortion;
    }

    public get percentageOfDailyPortion(): number {
        return this.ratioToPercentage(this._ratioOfDailyPortion);
    }

    public get quantitiesMultiplier(): number {
        return this.numberOfPeople * this.ratioOfDailyPortion;
    }

    public get nutrientsQuantitiesTarget(): NutrientsQuantitiesTarget {
        return this._nutrientsQuantitiesTarget;
    }

    private ratioToPercentage(ratio: number): number {
        return Math.round(ratio * 100);
    }

    private calculateNutrients(numberOfPeople: number,
        ratioOfDailyPortion: number
    ): NutrientsQuantitiesTarget {
        const multiplier = ratioOfDailyPortion * numberOfPeople;
        return Profile.referenceTargetPerPersonPerDay.multiplyBy(multiplier);
    }
}