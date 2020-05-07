import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkErrorsInterceptor } from './http-interceptors/network-errors-interceptor';
import { UiElementsModule } from '../ui-elements/ui-elements.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        UiElementsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: NetworkErrorsInterceptor, multi: true }
    ]
})
export class DataProviderModule { }
