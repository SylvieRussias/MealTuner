import { HistoryStatus } from './history-status';
import { Clonable } from './clonable';

export class History<T extends Clonable> {
    private historyStack: T[];
    private redoStack: T[];

    private _status: HistoryStatus<T>;

    constructor(historyStack?: T[], redoStack?: T[], status?: HistoryStatus<T>) {
        this.initUndoAndRedoStacks();
        if (redoStack) {
            this.redoStack.push(...redoStack);
        }
        if (historyStack) {
            this.historyStack.push(...historyStack);
            this.updateStatus(this.getArrayLastElement(this.historyStack));
        }
        if (status) {
            this._status = status.clone();
        }
    }

    public get status(): HistoryStatus<T> {
        return this._status;
    }

    /**
     * @description Registers a new step in the history, and clears the redo stack
     */
    public setNewStep(newStep: T) {
        this.historyStack.push(newStep);
        this.redoStack = [];
        this.updateStatus(newStep);
    }

    /**
     * @description Sets a new step without editig the history 
     * (this step is temporary and will NOT be saved)
     */
    public setNewStepWithoutSavingStep(newStep: T) {
        this.updateStatus(newStep);
    }

    /**
     * @description Performs an undo
     */
    public undo(): void {
        const stepBeforeUndo = this.historyStack.pop();
        this.redoStack.push(stepBeforeUndo);
        const stepAfterUndo = this.getArrayLastElement(this.historyStack);
        this.updateStatus(stepAfterUndo);
    }

    /**
     * @description Performs a redo
     */
    public redo(): void {
        const stepAfterRedo = this.redoStack.pop();
        this.historyStack.push(stepAfterRedo);
        this.updateStatus(stepAfterRedo);
    }

    /**
     * @description Delete undo and redo history (current value is NOT changed)
     */
    public clear(): void {
        this.initUndoAndRedoStacks();
        this.updateStatus(undefined);
    }

    /**
     * @description Returns a deep copy of this object
     */
    public clone(): History<T> {
        return new History(this.historyStack, this.redoStack, this.status);
    }

    private initUndoAndRedoStacks(): void {
        this.historyStack = [];
        this.redoStack = [];
    }

    /**
     * @description Updates the history status
     */
    private updateStatus(newCurrentStep: T): void {
        this._status = new HistoryStatus<T>(
            this.isUndoAvailable(),
            this.isRedoAvailable(),
            newCurrentStep
        );
    }

    private getArrayLastElement(array: any[]) {
        return array[array.length - 1];
    }

    private isUndoAvailable(): boolean {
        return this.historyStack.length > 1;
    }

    private isRedoAvailable(): boolean {
        return this.redoStack.length > 0;
    }
}