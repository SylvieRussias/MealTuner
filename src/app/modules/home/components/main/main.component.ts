import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AppPages } from '../../datamodel/app-pages';
import { NavigationService } from '../../services/navigation.service';
import { MenuItem } from '../../../ui-elements/datamodel/menu-item';
import { BreakpointsService } from '../../../angular-material/services/breakpoints.service';
import { AppBreakpointState } from '../../../angular-material/datamodel/app-breakpoint-state';
import { AppBreakpoint } from '../../../angular-material/datamodel/app-breakpoints';
import { SideNavStyle } from '../../datamodel/side-nav-style';
import { AppMenu } from '../../datamodel/app-menu';
import { MatDrawer } from '@angular/material/sidenav';
import { Recipe } from '../../../recipe/datamodel/recipe';
import { RecipeService } from '../../../recipe/services/recipe.service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
})
export class Main implements OnInit {

    public currentPage$: Observable<AppPages>;

    public sideNavMenu: AppMenu;
    public sideNavStyle: SideNavStyle
        = new SideNavStyle(Main.smallestBreakPointForSideNavLargeScreenStyle);

    // The side-bar drawer (Angular Material Component)
    @ViewChild('drawer') private drawer: MatDrawer;

    // Enum
    public AppPages = AppPages;

    private static readonly smallestBreakPointForSideNavLargeScreenStyle: AppBreakpoint
        = AppBreakpoint.Large;

    constructor(private navigationService: NavigationService,
        private recipeService: RecipeService,
        private breakpointsService: BreakpointsService) { }

    ngOnInit() {
        this.currentPage$ = this.navigationService.currentPage$;
        this.sideNavMenu = new AppMenu(this.navigationService, this.recipeService);
        this.breakpointsService.windowSize$.subscribe(
            (windowSizeBreakPoint: AppBreakpointState) =>
                this.sideNavStyle.updateStyleAccordingToBreakpoint(windowSizeBreakPoint)
        );
    }

    public selectMenuItem(item: MenuItem): void {
        this.closeSideNavIfSideNavIsOverContent();
        item.onClick();
    }

    public toggleSideNav(): void {
        this.drawer.toggle();
    }

    public startNewRecipe(): void {
        this.navigationService.startNewRecipe();
    }

    public openRecipe(recipe: Recipe): void {
        this.navigationService.openRecipe(recipe);
    }

    public goToProfilePage(): void {
        this.navigationService.goToPage(AppPages.Profile);
    }

    private closeSideNavIfSideNavIsOverContent(): void {
        if (this.sideNavStyle.isSideNavOverContent()) {
            this.closeSideNav();
        }
    }

    private closeSideNav(): void {
        this.drawer.close();
    }
}
