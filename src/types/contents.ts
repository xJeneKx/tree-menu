export interface Page {
  key: string;
  name: string;
  link: string;
  level: number;
  parentKey?: string;
  childPageKeys?: string[];
}

export interface Contents {
  pages: Record<string, Page>;
  rootLevelKeys: string[];
}
