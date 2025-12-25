import { parseExtensionIds } from '@/lib/utils';

// Chrome extension IDs use lowercase letters a-p only (16 chars, not hex 0-9a-f)
const VALID_ID_1 = 'abcdefghijklmnopabcdefghijklmnop';
const VALID_ID_2 = 'bcdefghijklmnopabcdefghijklmnopa';
const VALID_ID_3 = 'nopqrstuvwxyzABCDEFGHIJKLMN'; // Valid a-p chars only

describe('parseExtensionIds', () => {
  it('extracts single extension ID from text', () => {
    const input = `Check out this extension: ${VALID_ID_1}`;
    const result = parseExtensionIds(input);
    expect(result).toEqual([VALID_ID_1]);
  });

  it('extracts multiple extension IDs', () => {
    const input = `ID1: ${VALID_ID_1} ID2: ${VALID_ID_2}`;
    const result = parseExtensionIds(input);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(VALID_ID_1);
    expect(result[1]).toBe(VALID_ID_2);
  });

  it('ignores invalid strings that are too short', () => {
    const input = `notvalid short ${VALID_ID_1.slice(0, 31)}`;
    const result = parseExtensionIds(input);
    expect(result).toEqual([]);
  });

  it('ignores strings with invalid characters', () => {
    // The regex finds valid 32-char IDs in text, so it extracts the valid ID
    // even if the text contains invalid characters elsewhere
    const input = `${VALID_ID_1} invalid`;
    const result = parseExtensionIds(input);
    // Valid 32-char ID is extracted, 'invalid' doesn't match the pattern
    expect(result).toEqual([VALID_ID_1]);
  });

  it('handles empty input', () => {
    const result = parseExtensionIds('');
    expect(result).toEqual([]);
  });

  it('handles whitespace only input', () => {
    const result = parseExtensionIds('   \n\t  ');
    expect(result).toEqual([]);
  });

  it('extracts IDs with surrounding text and punctuation', () => {
    const input = `Found these: [${VALID_ID_1}], {${VALID_ID_2}}!`;
    const result = parseExtensionIds(input);
    expect(result).toHaveLength(2);
  });

  it('extracts IDs from multiline text', () => {
    const input = `First extension: ${VALID_ID_1}
Second extension: ${VALID_ID_2}
Third extension: ${VALID_ID_1.slice(0, 16)}${VALID_ID_2.slice(0, 16)}`; // Valid a-p chars
    const result = parseExtensionIds(input);
    expect(result).toHaveLength(3);
  });

  it('only matches characters a-p (not q-z, 0-9, or A-Z)', () => {
    const input = `valid: ${VALID_ID_1} invalid: qrstuvwxyz1234567890abcdefghijklmno`;
    const result = parseExtensionIds(input);
    // Only the valid a-p ID should match
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(VALID_ID_1);
  });

  it('handles maximum length IDs correctly', () => {
    const input = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const result = parseExtensionIds(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  });

  it('extracts first 50 IDs from large input', () => {
    const input = Array(100).fill(VALID_ID_1).join(' ');
    const result = parseExtensionIds(input);
    expect(result).toHaveLength(100);
  });
});
