import type { MenuItem } from '@/types/menu.ts';

export function filterMenuByName(menuItems: MenuItem[], searchInput: string): MenuItem[] {
  if (searchInput === '') {
    return [];
  }

  const searchTermLower = searchInput.toLowerCase();

  return menuItems
    .map((item) => {
      const nameMatches = item.name.toLowerCase().includes(searchTermLower);
      const filteredChildren = filterMenuByName(item.children, searchInput);
      if (nameMatches || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((item): item is MenuItem => item !== null);
}
