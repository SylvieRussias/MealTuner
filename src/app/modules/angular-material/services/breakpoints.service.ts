import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppBreakpointState } from '../datamodel/app-breakpoint-state';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BreakpointsService {
    public windowSize$: Observable<AppBreakpointState>;

    private static readonly breakpointsToObserve = [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ];

    constructor(public breakpointObserver: BreakpointObserver) {
        this.windowSize$ = this.breakpointObserver.observe(BreakpointsService.breakpointsToObserve).pipe(
            map((breakPoint: BreakpointState) => new AppBreakpointState(breakPoint))
        );
    }
}
