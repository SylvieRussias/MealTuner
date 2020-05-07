import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Main } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeModule } from '../recipe/recipe.module';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NutrientsModule } from '../nutrients/nutrients.module';

@NgModule({

    declarations: [
        Main,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularMaterialModule,
        RecipeModule,
        NutrientsModule,
        UiElementsModule,
        RouterModule.forChild([
            {
                path: '',
                component: Main
            }
        ])
    ],
})
export class HomePageModule { }
