import { NavigationService } from '../../services/navigation.service';
import { AppPages } from '../app-pages';
import { CheckForUnsavedRecipeChangesMenuItem } from './check-for-unsaved-recipe-changes-menu-item';
import { RecipeService } from '../../../recipe/services/recipe.service';

export class LoadRecipeMenuItem extends CheckForUnsavedRecipeChangesMenuItem {

    constructor(private navigationService: NavigationService,
        protected recipeService: RecipeService
    ) {
        super('Load', 'folder');
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
        this.navigationService.goToPage(AppPages.SearchRecipe);
    }
}