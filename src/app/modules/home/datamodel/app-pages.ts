import { ProfilePageDialogComponent } from '../../nutrients/components/profile-page-dialog/profile-page-dialog.component';

export enum AppPages {
    Home,
    Profile,
    RecipeEditing,
    SearchRecipe,
}

export namespace AppPages {
    export function isPopUpPage(page: AppPages): boolean {
        return page === AppPages.Profile;
    }

    export function getPopUpPageComponentType(page: AppPages): any {
        let componentType: any;
        switch (page) {
            case AppPages.Profile: componentType = ProfilePageDialogComponent;
        }
        return componentType;
    }
}