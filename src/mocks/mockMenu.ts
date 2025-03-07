import type { MenuItem } from '@/types/menu.ts';

export const smallMenuItems: MenuItem[] = [
  { key: 'key1', name: 'Item 1', link: 'link1', level: 0, children: [] },
  { key: 'key2', name: 'Item 2', link: 'link2', level: 0, children: [] },
];

export const largeMenuItems: MenuItem[] = [
  {
    key: 'key1',
    name: 'Item 1',
    link: 'link1',
    level: 0,
    children: [
      {
        key: 'key1_1',
        name: 'Item 1.1',
        link: 'link1_1',
        level: 1,
        children: [
          { key: 'key1_1_1', name: 'Item 1.1.1', link: 'link1_1_1', level: 2, children: [] },
        ],
      },
    ],
  },
  { key: 'key2', name: 'Item 2', link: 'link2', level: 0, children: [] },
];
