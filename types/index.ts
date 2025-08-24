export interface Extensions {
  id: string;
  title: string;
  found: boolean;
  browser: string;
  url: string;
  img_source: string;
}

export interface Store {
  browser: 'Edge' | 'Chrome';
  url: string;
  img_source: string;
}
