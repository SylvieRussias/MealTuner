import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodNutrientsComponent } from './components/food-nutrients/food-nutrients.component';
import { NutrientComponent } from './components/nutrient/nutrient.component';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NutrientProfileEditingPageComponent } from './components/nutrient-profile-editing-page/nutrient-profile-editing-page.component';
import { ProfilePageDialogComponent } from './components/profile-page-dialog/profile-page-dialog.component';
import { ProfilePreviewComponent } from './components/profile-preview/profile-preview.component';

@NgModule({
    declarations: [
        FoodNutrientsComponent,
        NutrientComponent,
        NutrientProfileEditingPageComponent,
        ProfilePageDialogComponent,
        ProfilePreviewComponent,
    ],
    imports: [
        CommonModule,
        UiElementsModule,
        AngularMaterialModule
    ],
    exports: [
        FoodNutrientsComponent,
        NutrientProfileEditingPageComponent,
        ProfilePreviewComponent,
    ],
})
export class NutrientsModule { }
