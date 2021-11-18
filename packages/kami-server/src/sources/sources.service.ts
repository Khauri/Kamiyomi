import 'reflect-metadata';
import * as path from 'path';
import {
  Page,
  Chapter,
  Cursor,
  PageInfo,
  Publication,
  PublicationSource,
} from 'kami-lib';
import { Injectable } from '@nestjs/common';

import { ExtensionsManager, ExtensionType } from '../extensions';
@Injectable()
export class SourcesService {
  private pubMap: Map<string, Publication> = new Map();

  private extensionsManager: ExtensionsManager;

  constructor() {
    this.extensionsManager = new ExtensionsManager();
    this.bootstrap();
  }
  name: string;

  private async bootstrap() {
    await this.extensionsManager.watchDirectory(
      // TODO: Grab this from .env or command line
      path.resolve(__dirname, '../../../extensions/en'),
    );
  }

  private cachePublications(...publications: Publication[]) {
    console.log(publications);
  }

  getSources(): PublicationSource[] {
    return this.extensionsManager
      .getExtensionsByType(ExtensionType.PUBLICATION_SOURCE)
      .map((ext) => ext.instance);
  }

  getSourceByName(name: string): PublicationSource {
    const extension = this.extensionsManager.getExtensionByName(name);
    if (extension.type !== ExtensionType.PUBLICATION_SOURCE) {
      throw new Error('Extension is not a source');
    }
    return extension.instance;
  }

  getPublicationById(id): Publication {
    // May need a new class that holds the publication and its source
    return this.pubMap.get(id);
  }

  async popular(
    sourceName: string,
    cursor: Cursor,
  ): Promise<PageInfo<Publication>> {
    const source = this.getSourceByName(sourceName);
    const pageInfo = await source.popular(cursor);
    this.cachePublications(...(pageInfo.entries as Publication[]));
    return pageInfo;
  }

  async publication(sourceName: string, pub_id: string): Promise<Publication> {
    const source = this.getSourceByName(sourceName);
    // TODO: Get publication from the cache if it exists. Othwerise fetch the publication.
    // TODO: Details function only needs to accept the id/url
    const publication = await source.details({
      url: pub_id,
      title: '',
      thumbnailUrl: '',
    });
    this.cachePublications(publication);
    return publication;
  }

  async chapters(sourceName: string, pub_id: string): Promise<Chapter[]> {
    const source = this.getSourceByName(sourceName);
    // TODO: Get publication from the cache if it exists. If chapters exists already return them.
    const chapters = await source.chapters({
      url: pub_id,
      title: '',
      thumbnailUrl: '',
    });
    return chapters;
  }

  async pages(
    sourceName: string,
    pub_id: string,
    chapter_id: string,
    cursor: Cursor,
  ): Promise<PageInfo<Page>> {
    const source = this.getSourceByName(sourceName);
    const pageInfo = await source.pages(
      { id: chapter_id },
      {
        url: pub_id,
        title: '',
        thumbnailUrl: '',
      },
      cursor,
    );
    return pageInfo;
  }
}
