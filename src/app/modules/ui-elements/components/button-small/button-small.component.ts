import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-button-small',
    templateUrl: './button-small.component.html',
    styleUrls: ['./button-small.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonSmallComponent {
    @Input() public matDefaultIconName: string;
    @Input() public isDisabled: boolean = false;
    @Input() public size: ButtonSmallComponent.Sizes = ButtonSmallComponent.Sizes.Normal;
    @Input() public style: ButtonSmallComponent.Styles = ButtonSmallComponent.Styles.Standard;
    @Output() private buttonClicked: EventEmitter<any> = new EventEmitter<any>();

    public isStandardStyle(): boolean {
        return this.style === ButtonSmallComponent.Styles.Standard
    }

    public isBlackNoBorderStyle(): boolean {
        return this.style === ButtonSmallComponent.Styles.BlackNoBorder
    }

    public isWhiteNoBorderStyle(): boolean {
        return this.style === ButtonSmallComponent.Styles.WhiteNoBorder
    }

    public isMainColorNoBorderStyle(): boolean {
        return this.style === ButtonSmallComponent.Styles.MainColorNoBorder
    }

    public isMainColorBackgroundStyle(): boolean {
        return this.style === ButtonSmallComponent.Styles.MainColorBackground;
    }

    public isSizeSmaller(): boolean {
        return this.size === ButtonSmallComponent.Sizes.Smaller;
    }

    public isSizeNormal(): boolean {
        return this.size === ButtonSmallComponent.Sizes.Normal;
    }

    public isSizeLarger(): boolean {
        return this.size === ButtonSmallComponent.Sizes.Larger;
    }

    public click(): void {
        this.buttonClicked.emit();
    }
}

export namespace ButtonSmallComponent {
    export enum Styles {
        Standard,
        BlackNoBorder,
        MainColorNoBorder,
        WhiteNoBorder,
        MainColorBackground
    }

    export enum Sizes {
        Smaller,
        Normal,
        Larger
    }
}
