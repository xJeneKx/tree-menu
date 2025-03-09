import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import VToggleTree from '@/components/VToggleTree.vue';

describe('VToggleTree.vue', () => {
  it('should render empty block when disabled', () => {
    const wrapper = mount(VToggleTree);
    expect(wrapper.find('[data-testid="toggle-icon"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="empty-block"]').exists()).toBe(true);
  });

  it('should render toggle icon when enabled', async () => {
    const wrapper = mount(VToggleTree, {
      props: {
        enabled: true,
      },
    });
    expect(wrapper.find('[data-testid="toggle-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="empty-block"]').exists()).toBe(false);
  });
});
