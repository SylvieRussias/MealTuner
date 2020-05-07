import { BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { AppBreakpoint } from './app-breakpoints';

export class AppBreakpointState {
    private breakpoint: AppBreakpoint;

    constructor(breakpointState: BreakpointState) {
        this.breakpoint = this.getAppBreakPointOfBreakpointState(breakpointState);
    }

    public isLargerThanOrEqualsTo(breakpointToBeComparedTo: AppBreakpoint): boolean {
        return this.breakpoint >= breakpointToBeComparedTo;
    }

    public isMoreNarrowThanOrEqualsTo(breakpointToBeComparedTo: AppBreakpoint): boolean {
        return this.breakpoint <= breakpointToBeComparedTo;
    }

    private getAppBreakPointOfBreakpointState(breakpointState: BreakpointState): AppBreakpoint {
        const breakpoints = breakpointState.breakpoints;
        let result: AppBreakpoint;
        if (breakpoints[Breakpoints.XSmall]) {
            result = AppBreakpoint.XSmall;
        }
        if (breakpoints[Breakpoints.Small]) {
            result = AppBreakpoint.Small;
        }
        if (breakpoints[Breakpoints.Medium]) {
            result = AppBreakpoint.Medium;
        }
        if (breakpoints[Breakpoints.Large]) {
            result = AppBreakpoint.Large;
        }
        if (breakpoints[Breakpoints.XLarge]) {
            result = AppBreakpoint.XLarge;
        }
        return result;
    }
}