import 'reflect-metadata';
import * as path from 'path';
import { Publication, PublicationSource } from 'kami-lib';
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

  private async bootstrap() {
    await this.extensionsManager.watchDirectory(
      // TODO: Grab this from .env or command line
      path.resolve(__dirname, '../../../extensions/en'),
    );
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
}
