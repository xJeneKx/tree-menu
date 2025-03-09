import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import VMenuTree from '@/components/tree/VMenuTree.vue';
import { largeMenuItems } from '@/mocks/mockMenu.ts';
import router from '@/router';

describe('VMenuTree.vue', () => {
  it('should render top-level menu items', () => {
    const wrapper = mount(VMenuTree, {
      props: {
        menuItems: largeMenuItems,
        isSearching: false,
        activeKey: '',
        openedKeys: {},
      },
      global: {
        plugins: [router],
      },
    });

    const menuItems = wrapper.findAll('[data-testid="menu-item"] > a');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].text()).toContain('Item 1');
    expect(menuItems[1].text()).toContain('Item 2');
  });

  it('should display all nested items when isSearching is true', () => {
    const wrapper = mount(VMenuTree, {
      props: {
        menuItems: largeMenuItems,
        isSearching: true,
        activeKey: '',
        openedKeys: {},
      },
      global: {
        plugins: [router],
      },
    });

    const menuItems = wrapper.findAll('[data-testid="menu-item"] > a');
    expect(menuItems.length).toBe(4);
    expect(wrapper.text()).toContain('Item 1.1');
    expect(wrapper.text()).toContain('Item 1.1.1');
  });

  it('should display children when parent key is in openedKeys', () => {
    const wrapper = mount(VMenuTree, {
      props: {
        menuItems: largeMenuItems,
        isSearching: false,
        activeKey: '',
        openedKeys: { key1: true },
      },
      global: {
        plugins: [router],
      },
    });

    const menuItems = wrapper.findAll('[data-testid="menu-item"] > a');
    expect(menuItems.length).toBe(3); // 2 top-level + 1 second-level (key1_1)
    expect(wrapper.text()).toContain('Item 1.1');
    expect(wrapper.text()).not.toContain('Item 1.1.1'); // Third level should be hidden
  });

  it('should highlight active menu item', () => {
    const wrapper = mount(VMenuTree, {
      props: {
        menuItems: largeMenuItems,
        isSearching: false,
        activeKey: 'key2',
        openedKeys: {},
      },
      global: {
        plugins: [router],
      },
    });

    const links = wrapper.findAll('[data-testid="menu-link"]');
    expect(links[1].attributes('data-active')).toBe('true');
    expect(links[0].attributes('data-active')).toBe('false');
  });
});
