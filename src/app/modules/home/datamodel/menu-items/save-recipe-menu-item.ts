import { MenuItem } from '../../../ui-elements/datamodel/menu-item';
import { NavigationService } from '../../services/navigation.service';
import { AppPages } from '../app-pages';
import { RecipeService } from '../../../recipe/services/recipe.service';

export class SaveRecipeMenuItem extends MenuItem {
    private isCurrentPageEditionPage: boolean = false;
    private canSaveRecipe: boolean = false;

    constructor(private navigationService: NavigationService,
        private recipeService: RecipeService
    ) {
        super('Save', 'save');
        this.navigationService.currentPage$.subscribe((currentPage: AppPages) =>
            this.updateIsCurrentPageEditionPage(currentPage)
        );
        this.recipeService.hasUnsavedChanges$.subscribe((hasUnsavedChanges: boolean) => {
            this.canSaveRecipe = hasUnsavedChanges;
        });
    }

    /**
     * @override
     */
    public isClickable(): boolean {
        const isSaveButtonRelevant = this.isCurrentPageEditionPage && this.canSaveRecipe;
        return isSaveButtonRelevant;
    }

    /**
     * @override
     */
    public onClick(): void {
        this.recipeService.saveCurrentRecipe();
    }

    private updateIsCurrentPageEditionPage(currentPage: AppPages): void {
        this.isCurrentPageEditionPage = currentPage === AppPages.RecipeEditing;
    }
}