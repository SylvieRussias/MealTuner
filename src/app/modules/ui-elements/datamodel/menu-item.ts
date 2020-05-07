export abstract class MenuItem {
    private _label: string;
    private _matIconName: string;
    protected _isSelected: boolean = false;

    constructor(label: string, matIconName: string) {
        this._label = label;
        this._matIconName = matIconName;
    }

    public abstract isClickable(): boolean;
    public abstract onClick(): void;

    public get label(): string {
        return this._label;
    }

    public get matIconName(): string {
        return this._matIconName;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public deselect(): void {
        this._isSelected = false;
    }
}