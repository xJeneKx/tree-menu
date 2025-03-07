import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { withSetup } from '@/tests/testUtils.ts';
import { useMenu } from './useMenu';
import { contents } from '@/mocks/mockContents.ts';

vi.mock('@/api/contents', () => ({
  getContents: vi.fn(),
}));

import { getContents } from '@/api/contents';

describe('useMenu', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return menu, status, and errorMessage with successful data loading', async () => {
    vi.mocked(getContents).mockResolvedValue(contents);

    const { menu, status, errorMessage } = withSetup(() => useMenu());
    await flushPromises();

    expect(menu.value.length).toBe(1);
    expect(status.value).toBe('success');
    expect(errorMessage.value).toBe('');
  });

  it('should handle pending data correctly', () => {
    const { status } = withSetup(() => useMenu());
    expect(status.value).toBe('pending');
  });

  it('should handle API errors correctly', async () => {
    const errorMsg = 'Failed to fetch contents';

    vi.mocked(getContents).mockRejectedValue(new Error(errorMsg));

    const { status, errorMessage } = withSetup(() => useMenu());
    await flushPromises();

    expect(status.value).toBe('error');
    expect(errorMessage.value).toBe(errorMsg);
  });
});
