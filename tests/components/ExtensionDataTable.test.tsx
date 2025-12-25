import ExtensionDataTable from '@/components/right_container/table/ExtensionDataTable';
import { Extensions } from '@/types';
import { render, screen } from '@testing-library/react';
import { X } from 'lucide-react';

describe('ExtensionDataTable', () => {
  const createMockExtension = (
    overrides: Partial<Extensions> = {},
  ): Extensions => ({
    id: 'abcdefghijklmnopqrstuvwxyz012345',
    title: 'Test Extension',
    found: true,
    browser: 'Chrome',
    url: 'https://chromewebstore.google.com/detail/test',
    img_source: '/images/Chrome_Logo.svg',
    ...overrides,
  });

  describe('Rendering', () => {
    it('renders found extension with title and link', () => {
      const mockData: Extensions[] = [createMockExtension()];

      render(<ExtensionDataTable extensionData={mockData} />);

      expect(screen.getByText('Test Extension')).toBeInTheDocument();
      expect(
        screen.getByText('abcdefghijklmnopqrstuvwxyz012345'),
      ).toBeInTheDocument();
    });

    it('renders not found extension with X icon', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          found: false,
          title: 'Chrome Web Store',
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      expect(screen.getByText('Not Found')).toBeInTheDocument();
      expect(screen.getByTestId('not-found-icon')).toBeInTheDocument();
    });

    it('renders multiple extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          id: 'aaa11111111111111111111111111111',
          title: 'Extension A',
        }),
        createMockExtension({
          id: 'bbb22222222222222222222222222222',
          title: 'Extension B',
        }),
        createMockExtension({
          id: 'ccc33333333333333333333333333333',
          title: 'Extension C',
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      expect(screen.getByText('Extension A')).toBeInTheDocument();
      expect(screen.getByText('Extension B')).toBeInTheDocument();
      expect(screen.getByText('Extension C')).toBeInTheDocument();
    });

    it('renders empty table when no data', () => {
      render(<ExtensionDataTable extensionData={[]} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.queryByRole('row')).not.toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('creates clickable link for extension ID', () => {
      const mockData: Extensions[] = [createMockExtension()];

      render(<ExtensionDataTable extensionData={mockData} />);

      const link = screen.getByRole('link', {
        name: /abcdefghijklmnopqrstuvwxyz012345/,
      });
      expect(link).toHaveAttribute(
        'href',
        'https://chromewebstore.google.com/detail/test',
      );
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('creates clickable link for extension title', () => {
      const mockData: Extensions[] = [createMockExtension()];

      render(<ExtensionDataTable extensionData={mockData} />);

      const link = screen.getByRole('link', { name: /Test Extension/ });
      expect(link).toHaveAttribute(
        'href',
        'https://chromewebstore.google.com/detail/test',
      );
    });
  });

  describe('Browser Icons', () => {
    it('displays Chrome logo for Chrome extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({ browser: 'Chrome' }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      // Check that Chrome image is rendered
      const images = screen.getAllByRole('img');
      expect(images.some((img) => img.alt === 'Chrome')).toBe(true);
    });

    it('displays Edge logo for Edge extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          browser: 'Edge',
          img_source: '/images/Edge_Logo.svg',
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      const images = screen.getAllByRole('img');
      expect(images.some((img) => img.alt === 'Edge')).toBe(true);
    });
  });

  describe('Error State', () => {
    it('displays ID for not found extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          found: false,
          title: 'Chrome Web Store',
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      expect(
        screen.getByText('abcdefghijklmnopqrstuvwxyz012345'),
      ).toBeInTheDocument();
    });

    it('shows X icon for not found extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          found: false,
          title: 'Chrome Web Store',
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      // The X icon should be present for not found items
      const xIcon = screen.getByTestId('not-found-icon');
      expect(xIcon).toBeInTheDocument();
    });
  });

  describe('Mixed Results', () => {
    it('renders mix of found and not found extensions', () => {
      const mockData: Extensions[] = [
        createMockExtension({
          id: 'aaa11111111111111111111111111111',
          title: 'Found Extension',
          found: true,
        }),
        createMockExtension({
          id: 'bbb22222222222222222222222222222',
          title: 'Chrome Web Store',
          found: false,
        }),
        createMockExtension({
          id: 'ccc33333333333333333333333333333',
          title: 'Another Found',
          found: true,
        }),
      ];

      render(<ExtensionDataTable extensionData={mockData} />);

      expect(screen.getByText('Found Extension')).toBeInTheDocument();
      expect(screen.getByText('Not Found')).toBeInTheDocument();
      expect(screen.getByText('Another Found')).toBeInTheDocument();
    });
  });
});
