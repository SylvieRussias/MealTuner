import { KeyValue } from './key-value';

/**
 * @description Objet that can represent different maps (different instances) but keeps the same instance
 * Use it to render re-instanciated maps whithout re-instanciating components (ex: for animations)
 */
export class MergeableMap<keyType, valueType> {
    private readonly mapElements: KeyValue<keyType, valueType>[] = [];

    public get keysValues(): KeyValue<keyType, valueType>[] {
        return this.mapElements;
    }

    public mergeWithMissingValuesDeleting(mapToMerge: Map<keyType, valueType>): void {
        this.merge(mapToMerge);
        this.deleteKeysNotPresentInMap(mapToMerge);
    }

    public merge(mapToMerge: Map<keyType, valueType>): void {
        for (const mapToMergeKey of mapToMerge.keys()) {
            const newValue = mapToMerge.get(mapToMergeKey);
            const existingKeyValue = this.getExistingValueIfExists(mapToMergeKey);
            if (existingKeyValue) {
                existingKeyValue.value = newValue;
            } else {
                this.createNewKeyValue(mapToMergeKey, newValue);
            }
        }
    }

    private getExistingValueIfExists(key: keyType): KeyValue<keyType, valueType> {
        return this.mapElements.find(x => x.key === key);
    }

    private createNewKeyValue(key: keyType, value: valueType): void {
        this.mapElements.push(new KeyValue<keyType, valueType>(key, value));
    }

    private deleteKeysNotPresentInMap(mapToMerge: Map<keyType, valueType>): void {
        // Indices of elements to delete in this.mapElements
        const indicesOfElementsToDelete = this.getIndicesOfElementsToDelete(mapToMerge);
        // Iterate through this.mapElements backwards, so that remaining elements to remove 
        // keep the same indice in the array when splicing it
        for (const i of indicesOfElementsToDelete.reverse()) {
            this.mapElements.splice(i, 1);
        }
    }

    private getIndicesOfElementsToDelete(mapToMerge: Map<keyType, valueType>): number[] {
        const indicesOfElementsToDelete: number[] = [];
        for (let i = 0; i < this.mapElements.length; i++) {
            const shouldElementBeDeleted = !mapToMerge.has(this.mapElements[i].key);
            if (shouldElementBeDeleted) {
                indicesOfElementsToDelete.push(i);
            }
        }
        return indicesOfElementsToDelete;
    }
}