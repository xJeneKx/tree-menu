import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

import { smallMenuItems, largeMenuItems } from '@/mocks/mockMenu.ts';
import { withSetup } from '@/tests/testUtils.ts';

import { useMenuSearch } from './useMenuSearch';

const mockDebouncedFn = vi.fn();
vi.mock('lodash.debounce', () => ({
  default: (fn: (searchInput: string) => void) => {
    return (searchInput: string) => {
      mockDebouncedFn.mockImplementation(() => fn(searchInput));
      return mockDebouncedFn;
    };
  },
}));

describe('useMenuSearch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockDebouncedFn.mockClear();
  });

  it('should initialize with empty search and all menu items', () => {
    const { searchInput, filteredMenuItems, isPendingSearch } = withSetup(() =>
      useMenuSearch(smallMenuItems),
    );

    expect(searchInput.value).toBe('');
    expect(filteredMenuItems.value).toEqual([]);
    expect(isPendingSearch.value).toBe(false);
  });

  it('should filter menu items when search input changes', async () => {
    const { searchInput, filteredMenuItems, isPendingSearch } = withSetup(() =>
      useMenuSearch(smallMenuItems),
    );

    searchInput.value = 'Item 1';
    await nextTick();

    mockDebouncedFn();
    await nextTick();

    expect(filteredMenuItems.value.length).toBe(1);
    expect(filteredMenuItems.value[0].name).toBe('Item 1');
    expect(isPendingSearch.value).toBe(false);
  });

  it('should update isPendingSearch when search begins', async () => {
    const { searchInput, isPendingSearch } = withSetup(() => useMenuSearch(largeMenuItems));

    searchInput.value = 'Item';
    await nextTick();

    expect(isPendingSearch.value).toBe(true);

    mockDebouncedFn();
    await nextTick();

    expect(isPendingSearch.value).toBe(false);
  });

  it('should find nested items in menu hierarchy', async () => {
    const { searchInput, filteredMenuItems } = withSetup(() => useMenuSearch(largeMenuItems));

    searchInput.value = '1.1.1';
    await nextTick();

    mockDebouncedFn();
    await nextTick();

    expect(filteredMenuItems.value).toHaveLength(1);
    expect(filteredMenuItems.value[0].children).toHaveLength(1);
    expect(filteredMenuItems.value[0].children[0].children).toHaveLength(1);
    expect(filteredMenuItems.value[0].children[0].children[0].key).toBe('key1_1_1');
  });

  it('should return empty array for non-matching search', async () => {
    const { searchInput, filteredMenuItems } = withSetup(() => useMenuSearch(smallMenuItems));

    searchInput.value = 'nonexistent';
    await nextTick();

    mockDebouncedFn();
    await nextTick();

    expect(filteredMenuItems.value).toEqual([]);
  });
});
