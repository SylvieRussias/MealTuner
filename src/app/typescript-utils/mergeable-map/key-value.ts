export class KeyValue<keyType, valueType> {
    private readonly _key: keyType;
    private _value: valueType;

    constructor(key: keyType, value: valueType) {
        this._key = key;
        this._value = value;
    }

    public get key(): keyType {
        return this._key;
    }

    public get value(): valueType {
        return this._value;
    }

    public set value(value: valueType) {
        this._value = value;
    }
}
