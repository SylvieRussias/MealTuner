import { Menu } from '../../ui-elements/datamodel/menu';
import { MenuItem } from '../../ui-elements/datamodel/menu-item';
import { NewRecipeMenuItem } from './menu-items/new-recipe-menu-item';
import { LoadRecipeMenuItem } from './menu-items/load-recipe-menu-item';
import { SaveRecipeMenuItem } from './menu-items/save-recipe-menu-item';
import { NavigationService } from '../services/navigation.service';
import { RecipeService } from '../../recipe/services/recipe.service';

export class AppMenu extends Menu {
    constructor(navigationService: NavigationService,
        recipeService: RecipeService
    ) {
        super();

        const NEW: MenuItem = new NewRecipeMenuItem(navigationService, recipeService);
        const LOAD: MenuItem = new LoadRecipeMenuItem(navigationService, recipeService);
        const SAVE: MenuItem = new SaveRecipeMenuItem(navigationService, recipeService);
        const MENU_ITEMS = [NEW, LOAD, SAVE];

        this.setMenuItems(MENU_ITEMS);
    }
}