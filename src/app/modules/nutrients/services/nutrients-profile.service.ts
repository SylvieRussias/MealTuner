import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from '../datamodel/profile';

@Injectable({
    providedIn: 'root',
})
export class NutrientsProfileService {
    public readonly profile$: Observable<Profile>;

    private readonly defaultProfile: Profile = new Profile(1, 0.33);
    private readonly profile: BehaviorSubject<Profile>
        = new BehaviorSubject<Profile>(this.defaultProfile);

    constructor() {
        this.profile$ = this.profile.asObservable();
    }

    public setNewProfile(newProfile: Profile): void {
        this.profile.next(newProfile);
    }
}
