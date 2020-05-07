import { RecipeEditingPageComponent } from './recipe-editing-page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('RecipeEditingPageComponent', () => {
    let component: RecipeEditingPageComponent;
    let fixture: ComponentFixture<RecipeEditingPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecipeEditingPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeEditingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
