export interface MenuItem {
  key: string;
  name: string;
  link: string;
  level: number;
  children: MenuItem[];
}

export interface MenuData {
  menuItems: MenuItem[];
  isSearching: boolean;
}
