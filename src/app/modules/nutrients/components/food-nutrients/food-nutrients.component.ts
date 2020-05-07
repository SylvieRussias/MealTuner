import { Component, Input, OnInit } from '@angular/core';
import { FoodNutrients } from '../../datamodel/food-nutrients';
import { NutrientsQuantitiesTarget } from '../../datamodel/nutrients-quantities-target';
import { NutrientsProfileService } from '../../services/nutrients-profile.service';
import { Observable } from 'rxjs';
import { NutrientsNames } from '../../datamodel/nutrients-names';
import { MergeableMap } from '../../../../typescript-utils/mergeable-map/mergeable-map';
import { Profile } from '../../datamodel/profile';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-food-nutrients',
    templateUrl: './food-nutrients.component.html',
    styleUrls: ['./food-nutrients.component.scss'],
})
export class FoodNutrientsComponent implements OnInit {
    @Input() public set nutrients(food: FoodNutrients) {
        this.quatityByNutrients.merge(food.allNutrients);
    }

    public readonly quatityByNutrients: MergeableMap<NutrientsNames, number> = new MergeableMap<NutrientsNames, number>();
    public nutrientsQuantitiesTarget$: Observable<NutrientsQuantitiesTarget>;

    constructor(
        private nutrientsQuantitiesTargetService: NutrientsProfileService
    ) {
        this.quatityByNutrients.merge(new FoodNutrients().allNutrients);
    }

    ngOnInit() {
        this.nutrientsQuantitiesTarget$ = this.nutrientsQuantitiesTargetService.profile$.pipe(map(
            (profile: Profile) =>
                profile.nutrientsQuantitiesTarget
        ));
    }
}
