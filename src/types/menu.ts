export interface MenuItem {
  key: string;
  name: string;
  link: string;
  level: number;
  children: MenuItem[];
}
