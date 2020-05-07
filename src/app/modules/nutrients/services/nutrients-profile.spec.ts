import { TestBed } from '@angular/core/testing';

import { NutrientsProfileService } from './nutrients-profile.service';

describe('NutrientsQuantitiesTargetService', () => {
    let service: NutrientsProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NutrientsProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
