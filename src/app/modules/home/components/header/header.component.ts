import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() private menuButtonClicked: EventEmitter<any> = new EventEmitter();
    @Output() private profileButtonClicked: EventEmitter<any> = new EventEmitter();

    public menuButtonClick(): void {
        this.menuButtonClicked.emit();
    }

    public profileButtonClick(): void {
        this.profileButtonClicked.emit();
    }
}
