import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RecipeEditingHistory } from '../../datamodel/recipe-editing-history';
import { Profile } from '../../../nutrients/datamodel/profile';
import { NutrientsProfileService } from '../../../nutrients/services/nutrients-profile.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-editable-recipe',
    templateUrl: './editable-recipe.component.html',
    styleUrls: ['./editable-recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableRecipeComponent implements OnInit, OnDestroy {
    @Output() private editingHistoryChange: EventEmitter<RecipeEditingHistory> = new EventEmitter();

    public _editingHistory: RecipeEditingHistory;
    public ingredientMaxQuantity: number;

    private readonly ingredientMaxQuantityPerPerson = 1150;
    private profileSubscription: Subscription;

    @Input() public set editingHistory(history: RecipeEditingHistory) {
        this._editingHistory = history;
    }

    constructor(private nutrientsProfileService: NutrientsProfileService) { }

    ngOnInit() {
        this.profileSubscription = this.nutrientsProfileService.profile$.subscribe(
            (profile: Profile) => this.setProfileConfig(profile)
        )
    }

    ngOnDestroy() {
        this.profileSubscription.unsubscribe();
    }

    public triggerEditingHistoryChange(history: RecipeEditingHistory): void {
        this._editingHistory = history;
        this.editingHistoryChange.emit(history);
    }

    private setProfileConfig(profile: Profile) {
        this.ingredientMaxQuantity = profile.quantitiesMultiplier * this.ingredientMaxQuantityPerPerson;
    }
}
