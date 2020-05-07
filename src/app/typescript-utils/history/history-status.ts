import { Clonable } from './clonable';

export class HistoryStatus<T extends Clonable> {
    private readonly _isUndoAvailable: boolean;
    private readonly _isRedoAvailable: boolean;
    private readonly _currentValue: T;

    constructor(isUndoAvailable: boolean, isRedoAvailable: boolean, currentValue: T) {
        this._isUndoAvailable = isUndoAvailable;
        this._isRedoAvailable = isRedoAvailable;
        this._currentValue = currentValue ? currentValue.clone() : null;
    }

    public get isUndoAvailable(): boolean {
        return this._isUndoAvailable;
    }

    public get isRedoAvailable(): boolean {
        return this._isRedoAvailable;
    }

    public get currentValue(): T {
        return this._currentValue;
    }

    public clone(): HistoryStatus<T> {
        return new HistoryStatus(
            this._isUndoAvailable,
            this._isRedoAvailable,
            this.currentValue
        );
    }
}