import { NavigationService } from '../../services/navigation.service';
import { AppPages } from '../app-pages';
import { CheckForUnsavedRecipeChangesMenuItem } from './check-for-unsaved-recipe-changes-menu-item';
import { RecipeService } from '../../../recipe/services/recipe.service';

export class NewRecipeMenuItem extends CheckForUnsavedRecipeChangesMenuItem {

    constructor(private navigationService: NavigationService,
        protected recipeService: RecipeService
    ) {
        super('New Recipe', 'add');
    }

    /**
     * @override
     */
    public isClickable(): boolean {
        return true;
    }

    /**
     * @override
     */
    protected performOnClickAction(): void {
        this.recipeService.createNewRecipe();
        this.navigationService.goToPage(AppPages.RecipeEditing);
    }
}