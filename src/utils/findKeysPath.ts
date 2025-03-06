import type { MenuItem } from '@/types/menu';

export function findKeysPath(
  menuItems: MenuItem[],
  targetKey: string,
  currentPath: string[] = [],
): string[] {
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const newPath = [...currentPath, item.key];

    if (item.key === targetKey) {
      return newPath;
    }

    if (item.children && item.children.length > 0) {
      const childResult = findKeysPath(item.children, targetKey, newPath);
      if (childResult.length) {
        return childResult;
      }
    }
  }

  return [];
}
