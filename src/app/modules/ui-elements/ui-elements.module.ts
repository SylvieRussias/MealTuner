import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ButtonSmallComponent } from './components/button-small/button-small.component';
import { ButtonStandardComponent } from './components/button-standard/button-standard.component';
import { TextSectionComponent } from './components/text-section/text-section.component';
import { HistoryToolbarComponent } from './components/history-toolbar/history-toolbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SliderForQualityIntervalsComponent } from './components/slider-for-quality-intervals/slider-for-quality-intervals.component';
import { SliderComponent } from './components/slider/slider.component';
import { TitleLabelComponent } from './components/title-label/title-label.component';
import { ToggleMainMenuButtonComponent } from './components/toggle-main-menu-button/toggle-main-menu-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

@NgModule({
    declarations: [
        ButtonStandardComponent,
        SliderComponent,
        SliderForQualityIntervalsComponent,
        TitleLabelComponent,
        ButtonSmallComponent,
        HistoryToolbarComponent,
        SideNavComponent,
        ToggleMainMenuButtonComponent,
        TextSectionComponent,
        ConfirmDialogComponent,
        NumberInputComponent,
        InfoDialogComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ButtonStandardComponent,
        SliderComponent,
        SliderForQualityIntervalsComponent,
        TitleLabelComponent,
        ButtonSmallComponent,
        HistoryToolbarComponent,
        FormsModule,
        ReactiveFormsModule,
        ToggleMainMenuButtonComponent,
        SideNavComponent,
        TextSectionComponent,
        ConfirmDialogComponent,
        NumberInputComponent,
    ],
})
export class UiElementsModule { }
