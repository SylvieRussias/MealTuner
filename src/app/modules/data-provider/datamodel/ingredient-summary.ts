export class IngredientSummary {
    private readonly _idInApi: string;
    private readonly _name: string;

    constructor(idInApi: string, name: string) {
        this._idInApi = idInApi;
        this._name = name;
    }

    public get idInApi(): string {
        return this._idInApi;
    }

    public get name(): string {
        return this._name;
    }
}