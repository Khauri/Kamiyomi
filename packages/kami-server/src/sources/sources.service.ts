import 'reflect-metadata';

import {Publication, PublicationSource} from 'kami-lib';
import {Dependencies, Injectable} from '@nestjs/common';
import {container} from 'tsyringe';

import ExampleSource from 'kami-extension-example';

@Injectable()
export class SourcesService {
  private pubMap: Map<string, Publication> = new Map();

  private sourceMap: Map<string, PublicationSource> = new Map();

  constructor() {
    // TODO: dynamically import sources from a sources directory
    const instance = container.resolve(ExampleSource);
    this.sourceMap.set(instance.name, instance);
  }

  getSources(): PublicationSource[] {
    return [...this.sourceMap.values()];
  }

  getSourceByName(name: string): PublicationSource {
    return this.sourceMap.get(name);
  }

  getPublicationById(id): Publication {
    // May need a new class that holds the publication and its source
    return this.pubMap.get(id);
  }
}