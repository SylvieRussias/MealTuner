import { MatDrawerMode } from '@angular/material/sidenav';
import { AppBreakpoint } from '../../angular-material/datamodel/app-breakpoints';
import { AppBreakpointState } from '../../angular-material/datamodel/app-breakpoint-state';

export class SideNavStyle {
    private smallestBreakPointForSideNavLargeScreenStyle: AppBreakpoint;
    private _isMainContentShadowedWhenSideNavIsOpened: boolean;
    private _sideNavOpenningMode: MatDrawerMode;

    private static readonly MAT_DRAWER_MODE_OVER = 'over';
    private static readonly MAT_DRAWER_MODE_SIDE = 'side';

    constructor(smallestBreakPointForSideNavLargeScreenStyle: AppBreakpoint) {
        this.smallestBreakPointForSideNavLargeScreenStyle = smallestBreakPointForSideNavLargeScreenStyle;
        this.setLargeScreenStyle();
    }

    public get isMainContentShadowedWhenSideNavIsOpened(): boolean {
        return this._isMainContentShadowedWhenSideNavIsOpened;
    }

    public get sideNavOpenningMode(): MatDrawerMode {
        return this._sideNavOpenningMode;
    }

    /**
     * @description Tells if the side nav is over content (and not next to it) when it's open
     */
    public isSideNavOverContent(): boolean {
        return this._sideNavOpenningMode === SideNavStyle.MAT_DRAWER_MODE_OVER;
    }

    public updateStyleAccordingToBreakpoint(windowSizeBreakPoint: AppBreakpointState): void {
        const hasSideNavLargeScreenStyle =
            windowSizeBreakPoint.isLargerThanOrEqualsTo(this.smallestBreakPointForSideNavLargeScreenStyle);
        if (hasSideNavLargeScreenStyle) {
            this.setLargeScreenStyle();
        } else {
            this.setSmallScreenStyle();
        }
    }

    private setSmallScreenStyle(): void {
        this._isMainContentShadowedWhenSideNavIsOpened = true;
        this._sideNavOpenningMode = SideNavStyle.MAT_DRAWER_MODE_OVER;
    }

    private setLargeScreenStyle(): void {
        this._isMainContentShadowedWhenSideNavIsOpened = false;
        this._sideNavOpenningMode = SideNavStyle.MAT_DRAWER_MODE_SIDE;
    }
}