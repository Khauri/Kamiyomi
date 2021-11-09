import * as parser from 'node-html-parser';

export class HTMLService {
  public parse(html: string, options?: Partial<parser.Options>): parser.HTMLElement {
    const root = parser.parse(html, options);
    return root;
  }
}
