import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { withSetup } from '@/tests/testUtils.ts';
import { useMenuState } from './useMenuState';
import { largeMenuItems } from '@/mocks/mockMenu.ts';
import type { MenuItem } from '@/types/menu.ts';

const mockRoute: { params: { link: string | null } } = {
  params: {
    link: null,
  },
};

const mockRouter = {
  replace: vi.fn(),
};

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => mockRouter,
}));

vi.mock('@/utils/convertLinkToKey.ts', () => ({
  convertLinkToKey: (link: string) => link.replace('-', '_'),
}));

vi.mock('@/utils/findKeysPath.ts', () => ({
  findKeysPath: (items: MenuItem[], key: string) => {
    if (key === 'link1_1_1') return ['key1', 'key1_1', 'key1_1_1'];
    if (key === 'link1_1') return ['key1', 'key1_1'];
    if (key === 'link1') return ['key1'];
    return [];
  },
}));

describe('useMenuState', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockRoute.params.link = null;
    mockRouter.replace.mockClear();
  });

  it('should initialize with empty openedKeys and null activeKey', () => {
    const { openedKeys, activeKey } = withSetup(() => useMenuState(largeMenuItems));

    expect(openedKeys.value).toEqual({});
    expect(activeKey.value).toBeNull();
  });

  it('should navigate to first menu item if no link is provided', async () => {
    withSetup(() => useMenuState(largeMenuItems));
    await flushPromises();

    expect(mockRouter.replace).toHaveBeenCalledWith({
      name: 'home',
      params: { link: 'link1' },
    });
  });

  it('should update activeKey and openedKeys when link param changes', async () => {
    mockRoute.params.link = 'link1_1_1';

    const { openedKeys, activeKey } = withSetup(() => useMenuState(largeMenuItems));
    await flushPromises();

    expect(activeKey.value).toBe('link1_1_1');

    expect(openedKeys.value).toEqual({
      key1: true,
      key1_1: true,
      key1_1_1: true,
    });
  });

  it('should handle link changes', async () => {
    mockRoute.params.link = 'link1_1';

    const { openedKeys, activeKey } = withSetup(() => useMenuState(largeMenuItems));

    await flushPromises();

    expect(activeKey.value).toBe('link1_1');
    expect(openedKeys.value).toEqual({
      key1: true,
      key1_1: true,
    });
  });

  it('should handle links that have no path', async () => {
    mockRoute.params.link = 'non_existent_link';

    const { openedKeys, activeKey } = withSetup(() => useMenuState(largeMenuItems));
    await flushPromises();

    expect(activeKey.value).toBe('non_existent_link');
    expect(openedKeys.value).toEqual({});
  });

  it('should handle empty menu items array', async () => {
    const { openedKeys, activeKey } = withSetup(() => useMenuState([]));
    await flushPromises();

    expect(activeKey.value).toBeNull();
    expect(openedKeys.value).toEqual({});
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
});
