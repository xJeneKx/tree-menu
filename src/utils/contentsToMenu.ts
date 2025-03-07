import type { Contents } from '@/types/contents.ts';
import type { MenuItem } from '@/types/menu';

export function convertContentsToMenu(data: Contents): MenuItem[] {
  const { pages, rootLevelKeys } = data;

  const createMenuItem = (pageKey: string, processed: Map<string, MenuItem>): MenuItem => {
    if (processed.has(pageKey)) {
      return processed.get(pageKey)!;
    }

    const page = pages[pageKey];

    if (!page) {
      throw new Error(`Page with key "${pageKey}" not found`);
    }

    const menuItem: MenuItem = {
      key: page.key,
      name: page.name,
      link: page.link,
      level: page.level,
      children: [],
    };

    processed.set(pageKey, menuItem);

    if (page.childPageKeys?.length) {
      menuItem.children = page.childPageKeys.map((childKey) => createMenuItem(childKey, processed));
    }

    return menuItem;
  };

  const processedMap = new Map<string, MenuItem>();

  return rootLevelKeys
    .filter((rootKey) => !!pages[rootKey])
    .map((rootKey) => createMenuItem(rootKey, processedMap));
}
