import { Extensions, Store } from '@/types';

describe('Type Definitions', () => {
  describe('Extensions interface', () => {
    it('accepts valid Chrome extension object', () => {
      const validExtension: Extensions = {
        id: 'abcdefghijklmnop1234567890123456',
        title: 'Test Extension',
        found: true,
        browser: 'Chrome',
        url: 'https://chromewebstore.google.com/detail/abcdefghijklmnop1234567890123456',
        img_source: '/images/Chrome_Logo.svg',
      };

      expect(validExtension.id.length).toBe(32);
      expect(validExtension.browser).toBe('Chrome');
      expect(validExtension.found).toBe(true);
    });

    it('accepts valid Edge extension object', () => {
      const validExtension: Extensions = {
        id: '1234567890abcdefghijklmnopabcdef',
        title: 'Edge Extension',
        found: true,
        browser: 'Edge',
        url: 'https://microsoftedge.microsoft.com/addons/detail/1234567890abcdefghijklmnopabcdef',
        img_source: '/images/Edge_Logo.svg',
      };

      expect(validExtension.id.length).toBe(32);
      expect(validExtension.browser).toBe('Edge');
      expect(validExtension.found).toBe(true);
    });

    it('accepts not found extension object', () => {
      const notFoundExtension: Extensions = {
        id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        title: 'Chrome Web Store',
        found: false,
        browser: 'Chrome',
        url: 'https://chromewebstore.google.com/detail/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        img_source: '/images/Chrome_Logo.svg',
      };

      expect(notFoundExtension.found).toBe(false);
      expect(notFoundExtension.title).toBe('Chrome Web Store');
    });

    it('has correct type properties', () => {
      const extension: Extensions = {
        id: 'abc',
        title: 'Title',
        found: true,
        browser: 'Chrome',
        url: 'http://test.com',
        img_source: '/img.svg',
      };

      expect(typeof extension.id).toBe('string');
      expect(typeof extension.title).toBe('string');
      expect(typeof extension.found).toBe('boolean');
      expect(typeof extension.browser).toBe('string');
      expect(typeof extension.url).toBe('string');
      expect(typeof extension.img_source).toBe('string');
    });
  });

  describe('Store interface', () => {
    it('accepts Edge store configuration', () => {
      const edgeStore: Store = {
        browser: 'Edge',
        url: 'https://microsoftedge.microsoft.com/addons/detail/',
        img_source: '/images/Edge_Logo.svg',
      };

      expect(edgeStore.browser).toBe('Edge');
      expect(edgeStore.url).toContain('microsoftedge');
    });

    it('accepts Chrome store configuration', () => {
      const chromeStore: Store = {
        browser: 'Chrome',
        url: 'https://chromewebstore.google.com/detail/',
        img_source: '/images/Chrome_Logo.svg',
      };

      expect(chromeStore.browser).toBe('Chrome');
      expect(chromeStore.url).toContain('chromewebstore');
    });

    it('restricts browser to Edge or Chrome only', () => {
      const edgeStore: Store = {
        browser: 'Edge',
        url: 'https://test.com',
        img_source: '/test.svg',
      };

      const chromeStore: Store = {
        browser: 'Chrome',
        url: 'https://test.com',
        img_source: '/test.svg',
      };

      // These should work
      expect(edgeStore.browser).toBe('Edge');
      expect(chromeStore.browser).toBe('Chrome');

      // This would cause a TypeScript error at compile time
      // const invalidStore: Store = { browser: 'Firefox', ... }
    });

    it('has correct type properties', () => {
      const store: Store = {
        browser: 'Chrome',
        url: 'https://test.com',
        img_source: '/img.svg',
      };

      expect(typeof store.browser).toBe('string');
      expect(typeof store.url).toBe('string');
      expect(typeof store.img_source).toBe('string');
    });
  });

  describe('Data Relationships', () => {
    it('Extensions browser matches Store browser types', () => {
      const chromeExtensions: Extensions[] = [
        {
          id: 'a',
          title: 'A',
          found: true,
          browser: 'Chrome',
          url: '',
          img_source: '',
        },
      ];

      const edgeExtensions: Extensions[] = [
        {
          id: 'b',
          title: 'B',
          found: true,
          browser: 'Edge',
          url: '',
          img_source: '',
        },
      ];

      chromeExtensions.forEach((ext) => {
        expect(['Chrome', 'Edge']).toContain(ext.browser);
      });

      edgeExtensions.forEach((ext) => {
        expect(['Chrome', 'Edge']).toContain(ext.browser);
      });
    });

    it('can create Extensions array from Store data', () => {
      const stores: Store[] = [
        {
          browser: 'Chrome',
          url: 'https://chrome.com/',
          img_source: '/chrome.svg',
        },
        { browser: 'Edge', url: 'https://edge.com/', img_source: '/edge.svg' },
      ];

      const extensions: Extensions[] = stores.map((store) => ({
        id: 'test123456789012345678901234',
        title: 'Test Extension',
        found: true,
        browser: store.browser,
        url: store.url + 'test123456789012345678901234',
        img_source: store.img_source,
      }));

      expect(extensions).toHaveLength(2);
      expect(extensions[0].browser).toBe('Chrome');
      expect(extensions[1].browser).toBe('Edge');
    });
  });
});
