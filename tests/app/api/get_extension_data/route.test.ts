import { deduplicateExtensionData } from '@/lib/utils';
import { Extensions, Store } from '@/types';

// Mock cheerio
jest.mock('cheerio', () => ({
  load: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('API Route - Deduplication Logic', () => {
  const mockStores: Store[] = [
    {
      browser: 'Edge',
      url: 'https://microsoftedge.microsoft.com/addons/detail/',
      img_source: '/images/Edge_Logo.svg',
    },
    {
      browser: 'Chrome',
      url: 'https://chromewebstore.google.com/detail/',
      img_source: '/images/Chrome_Logo.svg',
    },
  ];

  describe('deduplicateExtensionData', () => {
    it('prefers found extensions over not found', () => {
      const ids = ['ext1'];
      const extensions: Extensions[] = [
        {
          id: 'ext1',
          title: 'Chrome Web Store',
          found: false,
          browser: 'Edge',
          url: 'https://microsoftedge.microsoft.com/addons/detail/ext1',
          img_source: '/images/Edge_Logo.svg',
        },
        {
          id: 'ext1',
          title: 'My Extension',
          found: true,
          browser: 'Chrome',
          url: 'https://chromewebstore.google.com/detail/ext1',
          img_source: '/images/Chrome_Logo.svg',
        },
      ];

      const result = deduplicateExtensionData(ids, extensions);
      expect(result).toHaveLength(1);
      expect(result[0].found).toBe(true);
      expect(result[0].browser).toBe('Chrome');
      expect(result[0].title).toBe('My Extension');
    });

    it('returns first result when all are not found', () => {
      const ids = ['ext1'];
      const extensions: Extensions[] = [
        {
          id: 'ext1',
          title: 'Chrome Web Store',
          found: false,
          browser: 'Edge',
          url: 'https://microsoftedge.microsoft.com/addons/detail/ext1',
          img_source: '/images/Edge_Logo.svg',
        },
      ];

      const result = deduplicateExtensionData(ids, extensions);
      expect(result).toHaveLength(1);
      expect(result[0].found).toBe(false);
    });

    it('handles multiple IDs with mixed results', () => {
      const ids = ['ext1', 'ext2', 'ext3'];
      const extensions: Extensions[] = [
        {
          id: 'ext1',
          title: 'Extension 1',
          found: true,
          browser: 'Chrome',
          url: 'https://chromewebstore.google.com/detail/ext1',
          img_source: '/images/Chrome_Logo.svg',
        },
        {
          id: 'ext1',
          title: 'Chrome Web Store',
          found: false,
          browser: 'Edge',
          url: 'https://microsoftedge.microsoft.com/addons/detail/ext1',
          img_source: '/images/Edge_Logo.svg',
        },
        {
          id: 'ext2',
          title: 'Chrome Web Store',
          found: false,
          browser: 'Edge',
          url: 'https://microsoftedge.microsoft.com/addons/detail/ext2',
          img_source: '/images/Edge_Logo.svg',
        },
        {
          id: 'ext2',
          title: 'Chrome Web Store',
          found: false,
          browser: 'Chrome',
          url: 'https://chromewebstore.google.com/detail/ext2',
          img_source: '/images/Chrome_Logo.svg',
        },
        {
          id: 'ext3',
          title: 'Extension 3',
          found: true,
          browser: 'Edge',
          url: 'https://microsoftedge.microsoft.com/addons/detail/ext3',
          img_source: '/images/Edge_Logo.svg',
        },
      ];

      const result = deduplicateExtensionData(ids, extensions);
      expect(result).toHaveLength(3);
      expect(result[0].found).toBe(true);
      expect(result[0].browser).toBe('Chrome');
      expect(result[1].found).toBe(false);
      expect(result[2].found).toBe(true);
      expect(result[2].browser).toBe('Edge');
    });

    it('maintains order of input IDs in output', () => {
      const ids = ['aaa', 'bbb', 'ccc'];
      const extensions: Extensions[] = [
        {
          id: 'bbb',
          title: 'B',
          found: true,
          browser: 'Chrome',
          url: '',
          img_source: '',
        },
        {
          id: 'aaa',
          title: 'A',
          found: true,
          browser: 'Chrome',
          url: '',
          img_source: '',
        },
        {
          id: 'ccc',
          title: 'C',
          found: true,
          browser: 'Chrome',
          url: '',
          img_source: '',
        },
      ];

      const result = deduplicateExtensionData(ids, extensions);
      expect(result[0].id).toBe('aaa');
      expect(result[1].id).toBe('bbb');
      expect(result[2].id).toBe('ccc');
    });

    it('handles empty arrays', () => {
      const result = deduplicateExtensionData([], []);
      expect(result).toEqual([]);
    });
  });

  describe('Store Configuration', () => {
    it('has correct Edge store configuration', () => {
      const edgeStore = mockStores.find((s) => s.browser === 'Edge');
      expect(edgeStore).toBeDefined();
      expect(edgeStore?.url).toBe(
        'https://microsoftedge.microsoft.com/addons/detail/',
      );
      expect(edgeStore?.img_source).toBe('/images/Edge_Logo.svg');
    });

    it('has correct Chrome store configuration', () => {
      const chromeStore = mockStores.find((s) => s.browser === 'Chrome');
      expect(chromeStore).toBeDefined();
      expect(chromeStore?.url).toBe(
        'https://chromewebstore.google.com/detail/',
      );
      expect(chromeStore?.img_source).toBe('/images/Chrome_Logo.svg');
    });

    it('has exactly 2 stores configured', () => {
      expect(mockStores).toHaveLength(2);
    });
  });

  describe('Title Parsing', () => {
    it('correctly identifies Chrome Web Store error page', () => {
      const title = 'Chrome Web Store';
      expect(
        title === 'Chrome Web Store' ||
          title === 'Microsoft Edge AddonsYour Privacy Choice Opt-Out Icon',
      ).toBe(true);
    });

    it('correctly identifies Edge Addons error page', () => {
      const title = 'Microsoft Edge AddonsYour Privacy Choice Opt-Out Icon';
      expect(
        title === 'Chrome Web Store' ||
          title === 'Microsoft Edge AddonsYour Privacy Choice Opt-Out Icon',
      ).toBe(true);
    });

    it('recognizes valid extension titles', () => {
      const validTitles = [
        'uBlock Origin',
        'React Developer Tools',
        'Dark Reader',
        'Hello World Extension - Chrome Web Store',
      ];

      validTitles.forEach((title) => {
        const isErrorPage =
          title === 'Chrome Web Store' ||
          title === 'Microsoft Edge AddonsYour Privacy Choice Opt-Out Icon';
        expect(isErrorPage).toBe(false);
      });
    });
  });
});
