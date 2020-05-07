import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Profile } from '../../datamodel/profile';
import { NutrientsProfileService } from '../../services/nutrients-profile.service';

@Component({
    selector: 'app-profile-preview',
    templateUrl: './profile-preview.component.html',
    styleUrls: ['./profile-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePreviewComponent {
    public profile$: Observable<Profile>;

    constructor(private nutrientsProfileService: NutrientsProfileService) {
        this.profile$ = this.nutrientsProfileService.profile$;
    }
}
