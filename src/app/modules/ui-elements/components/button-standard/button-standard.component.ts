import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-button-standard',
    templateUrl: './button-standard.component.html',
    styleUrls: ['./button-standard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonStandardComponent {
    @Input() public matIconsNames: string[] = [];
    @Input() public text: string;
    @Input() public style: ButtonStandardComponent.Styles
        = ButtonStandardComponent.Styles.Standard;
    @Input() public shape: ButtonStandardComponent.Shape
        = ButtonStandardComponent.Shape.Rounded;

    public isStandardStyle(): boolean {
        return this.style === ButtonStandardComponent.Styles.Standard;
    }

    public isSecondaryActionStyle(): boolean {
        return this.style === ButtonStandardComponent.Styles.SecondaryAction;
    }

    public isRounded(): boolean {
        return this.shape === ButtonStandardComponent.Shape.Rounded;
    }
}

export namespace ButtonStandardComponent {
    export enum Styles {
        Standard,
        SecondaryAction
    }

    export enum Shape {
        Rounded,
        Rectangle
    }
}
