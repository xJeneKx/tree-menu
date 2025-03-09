import { describe, it, expect } from 'vitest';

import { smallMenuItems, largeMenuItems } from '@/mocks/mockMenu.ts';
import type { MenuItem } from '@/types/menu';

import { findKeysPath } from './findKeysPath';


describe('findKeysPath', () => {
  it('should find path to an item in the first level', () => {
    const path = findKeysPath(smallMenuItems, 'key2');
    expect(path).toEqual(['key2']);
  });

  it('should find path to a nested item', () => {
    const path = findKeysPath(largeMenuItems, 'key1_1_1');
    expect(path).toEqual(['key1', 'key1_1', 'key1_1_1']);
  });

  it('should return empty array if key is not found', () => {
    const path = findKeysPath(smallMenuItems, 'nonexistent');
    expect(path).toEqual([]);
  });

  it('should handle empty menu items', () => {
    const menuItems: MenuItem[] = [];
    const path = findKeysPath(menuItems, 'key1');
    expect(path).toEqual([]);
  });
});
