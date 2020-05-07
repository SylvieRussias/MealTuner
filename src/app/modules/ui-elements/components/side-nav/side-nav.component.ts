import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from '../../datamodel/menu-item';
import { Menu } from '../../datamodel/menu';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
    @Input() public menu: Menu;
    @Output() private selectMenuItem: EventEmitter<any> = new EventEmitter<any>();

    public selectItem(item: MenuItem): void {
        this.selectMenuItem.emit(item);
    }

    public isItemSelectable(item: MenuItem): boolean {
        return item.isClickable();
    }

    public isItemSelected(item: MenuItem): boolean {
        return item.isSelected;
    }
}
