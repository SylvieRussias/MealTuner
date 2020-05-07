import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNutrientsComponent } from './food-nutrients.component';

describe('FoodNutrientsComponent', () => {
    let component: FoodNutrientsComponent;
    let fixture: ComponentFixture<FoodNutrientsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FoodNutrientsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodNutrientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
