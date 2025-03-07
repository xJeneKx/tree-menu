import { describe, it, expect } from 'vitest';
import { convertLinkToKey } from './convertLinkToKey';

describe('convertLinkToKey', () => {
  it('should replace .html extension', () => {
    const result = convertLinkToKey('page.html');
    expect(result).toBe('page');
  });

  it('should replace hyphens with underscores', () => {
    const result = convertLinkToKey('page-name');
    expect(result).toBe('page_name');
  });

  it('should handle both .html extension and hyphens', () => {
    const result = convertLinkToKey('page-name.html');
    expect(result).toBe('page_name');
  });

  it('should return the same string if no replacements needed', () => {
    const result = convertLinkToKey('page');
    expect(result).toBe('page');
  });

  it('should handle multiple hyphens', () => {
    const result = convertLinkToKey('page-with-multiple-hyphens');
    expect(result).toBe('page_with_multiple_hyphens');
  });
});
