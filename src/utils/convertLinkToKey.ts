export function convertLinkToKey(link: string): string {
  return link.replace('.html', '').replace(/-/g, '_');
}
