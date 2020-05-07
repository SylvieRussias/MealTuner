import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Interval } from '../../../ui-elements/datamodel/interval';
import { NutrientsProfileService } from '../../services/nutrients-profile.service';
import { Subscription } from 'rxjs';
import { Profile } from '../../datamodel/profile';

@Component({
    selector: 'app-nutrient-profile-editing-page',
    templateUrl: './nutrient-profile-editing-page.component.html',
    styleUrls: ['./nutrient-profile-editing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NutrientProfileEditingPageComponent implements OnInit {
    public numberOfPeople: number;
    public defaultNumberOfPeople = 1;
    public minNumberOfPeople = 1;
    public percentageOfDailyPortion: number;
    public readonly percentageValuesInterval = new Interval(0, 100);

    private profileSubscription: Subscription;

    constructor(private nutrientsProfileService: NutrientsProfileService) { }

    ngOnInit() {
        this.profileSubscription = this.nutrientsProfileService.profile$.subscribe(
            (profile: Profile) => this.profile = profile
        );
    }

    ngOnDestroy() {
        this.profileSubscription.unsubscribe();
    }

    public setNewNumberOfPeople(newNumberOfPeople: number): void {
        this.numberOfPeople = newNumberOfPeople;
        this.triggerProfileChange();
    }

    public setNewPercentageOfDailyPortion(percentageOfDailyPortion: number): void {
        this.percentageOfDailyPortion = percentageOfDailyPortion;
        this.triggerProfileChange();
    }

    private set profile(profile: Profile) {
        this.numberOfPeople = profile.numberOfPeople;
        this.percentageOfDailyPortion = profile.percentageOfDailyPortion;
    }

    private triggerProfileChange(): void {
        const profile = new Profile(
            this.numberOfPeople,
            this.percentageToRatio(this.percentageOfDailyPortion)
        );
        this.nutrientsProfileService.setNewProfile(profile);
    }

    private percentageToRatio(percentage: number): number {
        return percentage / 100;
    }
}
