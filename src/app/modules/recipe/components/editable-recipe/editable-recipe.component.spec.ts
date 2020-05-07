import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableRecipeComponent } from './editable-recipe.component';

describe('EditableRecipeComponent', () => {
    let component: EditableRecipeComponent;
    let fixture: ComponentFixture<EditableRecipeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditableRecipeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditableRecipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
