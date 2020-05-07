import { MenuItem } from './menu-item';

export class Menu {
    private _items: MenuItem[];

    public get items(): MenuItem[] {
        return this._items;
    }

    public deselectAllItems(): void {
        for (const i of this._items) {
            i.deselect();
        }
    }

    protected setMenuItems(items: MenuItem[]) {
        this._items = items;
    }
}