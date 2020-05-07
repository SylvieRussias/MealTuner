import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Main } from './main.component';

describe('HomePage', () => {
    let component: Main;
    let fixture: ComponentFixture<Main>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Main],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(Main);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
