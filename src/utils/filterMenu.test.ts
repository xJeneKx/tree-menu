import { describe, it, expect } from 'vitest';
import { filterMenuByName } from './filterMenu';
import type { MenuItem } from '@/types/menu';

describe('filterMenuByName', () => {
  const testMenuItems: MenuItem[] = [
    {
      key: 'item1',
      name: 'First Item',
      link: 'first-item',
      level: 0,
      children: [
        {
          key: 'item1_1',
          name: 'Nested Item',
          link: 'nested-item',
          level: 1,
          children: [],
        },
      ],
    },
    {
      key: 'item2',
      name: 'Second Item',
      link: 'second-item',
      level: 0,
      children: [],
    },
    {
      key: 'item3',
      name: 'Third Special',
      link: 'third-special',
      level: 0,
      children: [
        {
          key: 'item3_1',
          name: 'Special Child',
          link: 'special-child',
          level: 1,
          children: [],
        },
      ],
    },
  ];

  it('should return empty array when search input is empty', () => {
    const result = filterMenuByName(testMenuItems, '');
    expect(result).toEqual([]);
  });

  it('should filter items by exact name match (case insensitive)', () => {
    const result = filterMenuByName(testMenuItems, 'first item');
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('item1');
  });

  it('should filter items by partial name match', () => {
    const result = filterMenuByName(testMenuItems, 'item');
    expect(result).toHaveLength(2);
    expect(result[0].children).toHaveLength(1);
    expect(result.some((item) => item.key === 'item1')).toBe(true);
    expect(result.some((item) => item.key === 'item2')).toBe(true);
  });

  it('should include parent items when children match search criteria', () => {
    const result = filterMenuByName(testMenuItems, 'special child');
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('item3');
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children[0].key).toBe('item3_1');
  });

  it('should handle case insensitive search', () => {
    const result = filterMenuByName(testMenuItems, 'SPECIAL');
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('item3');
  });

  it('should return only matching items with their matching children', () => {
    const result = filterMenuByName(testMenuItems, 'nested');
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('item1');
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children[0].name).toBe('Nested Item');
  });
});
