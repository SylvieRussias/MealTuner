import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable, from, zip } from 'rxjs';
import { take, concatMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private nativeStorage: NativeStorage) { }

    /**
     * @description Saves a single file
     */
    public saveFile(filePath: string, jsonObject: any): Observable<any> {
        return from(this.nativeStorage.setItem(filePath, jsonObject)).pipe(take(1));
    }

    /**
     * @description Tells if a file already exists
     */
    public isFileExisting(filePath: string): Observable<boolean> {
        return this.getAllStorageKeys().pipe(
            map(
                (keys: string[]) => keys.includes(filePath)
            )
        );
    }

    /**
     * @description Loads a single file
     */
    public loadFile(filePath: string): Observable<any> {
        return from(this.nativeStorage.getItem(filePath)).pipe(take(1));
    }

    /**
     * @description Loads all the files that have a storage key (storage path) 
     * starting with a prefix.
     * Can be used to get all the files in a folder.
     * @param folderPath: the prefix
     */
    public loadFolder(folderPath: string): Observable<any[]> {
        return this.getAllStorageKeys()
            .pipe(concatMap(
                (keys: string[]) => {
                    const folderKeys = this.getKeysMatchingFolder(folderPath, keys);
                    return this.loadFiles(folderKeys);
                })
            );
    }

    /**
     * @description Filters an array of keys to keep only the keys that 
     * start with a prefix
     * @param folderPath: the prefix
     * @param allKeys: the keys to filter
     */
    private getKeysMatchingFolder(folderPath: string, allKeys: string[]): string[] {
        return allKeys.filter(
            (key: string) => key.startsWith(folderPath)
        );
    }

    /**
     * @description Loads multiple files 
     * @param keys: the paths of the files
     */
    private loadFiles(keys: string[]): Observable<any[]> {
        const loadFilesObservables: Observable<any>[] = keys.map(
            key => this.loadFile(key)
        );
        return zip(...loadFilesObservables).pipe(take(1));
    }

    /**
     * @description Gets all the keys (path of each file) in the native 
     * storage for this app
     */
    private getAllStorageKeys(): Observable<string[]> {
        return from(this.nativeStorage.keys()).pipe(take(1));
    }
}


