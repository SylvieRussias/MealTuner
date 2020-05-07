import { MenuItem } from '../../../ui-elements/datamodel/menu-item';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../../recipe/services/recipe.service';

export abstract class CheckForUnsavedRecipeChangesMenuItem extends MenuItem {

    protected recipeService: RecipeService;

    private canLeaveRecipeSubscription: Subscription;

    /**
     * @override
     */
    public onClick(): void {
        this.canLeaveRecipeSubscription = this.recipeService.canLeaveCurrentRecipe()
            .subscribe((canLeave: boolean) =>
                this.handleCanLeaveRecipeResponse(canLeave)
            );
    }

    protected abstract performOnClickAction(): void;

    private handleCanLeaveRecipeResponse(canLeave: boolean): void {
        switch (canLeave) {
            case true: this.performOnClickAction();
            case false: this.unsubscribeFromLeaveResponse();
            // canLeave can be undefined if the response is not available yet
        }
    }

    private unsubscribeFromLeaveResponse(): void {
        if (this.canLeaveRecipeSubscription) {
            this.canLeaveRecipeSubscription.unsubscribe();
        }
    }
}