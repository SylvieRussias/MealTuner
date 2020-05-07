import { AddNewIngredientService } from './../../services/add-new-ingredient.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { IngredientSummary } from 'src/app/modules/data-provider/datamodel/ingredient-summary';
import { debounceTime, take } from 'rxjs/operators';
import { Ingredient } from '../../datamodel/ingredient';

@Component({
    selector: 'app-add-new-ingredient',
    templateUrl: './add-new-ingredient.component.html',
    styleUrls: ['./add-new-ingredient.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewIngredientComponent implements OnInit, OnDestroy {
    @Output() addNewIngredient: EventEmitter<Ingredient> = new EventEmitter();

    public newIngredientSearchText: FormControl = new FormControl();

    public ingredientSearchAutoComplete$: Observable<IngredientSummary[]>;

    private readonly debounceTimeInMs = 300;
    private readonly autoCompleteSearchText: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    private readonly debouncedAutoCompleteSearchText$ = this.autoCompleteSearchText.asObservable().pipe(debounceTime(this.debounceTimeInMs));
    private autoCompleteSearchSubscription: Subscription;

    constructor(private addNewIngredientService: AddNewIngredientService) { }

    ngOnInit() {
        this.ingredientSearchAutoComplete$ = this.addNewIngredientService.ingredientsMatchingSearchText$;
        this.autoCompleteSearchSubscription = this.initSubscriptionToDebouncedAutoComplete();
    }

    ngOnDestroy() {
        this.autoCompleteSearchSubscription.unsubscribe();
    }

    public isSearchTextEmpty(): boolean {
        return this.newIngredientSearchText.value == '';
    }

    /**
     * @description Triggers autocompletion for the current search text
     */
    public autoCompleteSearch(): void {
        this.autoCompleteSearchText.next(undefined);
    }

    /**
     * @description Search ingredient matching the text that has been typed
     */
    public searchIngredient(): void {
        if (this.newIngredientSearchText.value) {
            this.addNewIngredientService.searchForIngredientsMatchingText(this.newIngredientSearchText.value);
        }
    }

    /**
     * @description Add to the receipe the ingredient corresponding to the selected ingredient summary
     */
    public addIngredient(ingredientSummary: IngredientSummary): void {
        this.resetNewIngredientInput();
        this.addNewIngredientService.fetchIngredientDetails(ingredientSummary).pipe(take(1)).subscribe((ingredient: Ingredient) => {
            this.addNewIngredient.emit(ingredient);
        });
    }

    /**
     * @description Add to the receipe the ingredient corresponding to the first option in auto-completion (if any)
     */
    public addIngredientOfFirstAutoCompleteOption() {
        this.ingredientSearchAutoComplete$.pipe(take(1)).subscribe((ingredientsSummaries: IngredientSummary[]) => {
            this.addFirstIngredientOfSummaryListIfNotEmpty(ingredientsSummaries);
        });
    }

    public resetInput() {
        this.waitForInputEventsIfAnyThenResetInput();
    }

    private waitForInputEventsIfAnyThenResetInput() {
        setTimeout(() => {
            this.resetNewIngredientInput();
        }, 1);
    }

    private resetNewIngredientInput() {
        this.newIngredientSearchText.setValue('');
    }

    private initSubscriptionToDebouncedAutoComplete(): Subscription {
        return this.debouncedAutoCompleteSearchText$.subscribe(() => this.searchIngredient());
    }

    private addFirstIngredientOfSummaryListIfNotEmpty(ingredientsSummaries: IngredientSummary[]) {
        if (ingredientsSummaries.length > 0) {
            this.addFirstIngredientOfSummaryList(ingredientsSummaries);
        }
    }

    private addFirstIngredientOfSummaryList(ingredientsSummaries: IngredientSummary[]): void {
        const summaryOfIngredientToAdd = ingredientsSummaries[0];
        this.addIngredient(summaryOfIngredientToAdd);
    }
}
