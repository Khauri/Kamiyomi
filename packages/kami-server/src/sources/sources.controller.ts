import {Cursor, Publication} from 'kami-lib';
import {Controller, Get, Param, Post, Query} from '@nestjs/common';
import {SourcesService} from './sources.service';

// Maybe turn this into a class?
export interface SourceDetails {
  name: string;
  cachedPublications?: Map<string, Publication>;
}

@Controller('sources')
export class SourcesController {
  constructor(private sources: SourcesService) {}

  @Get()
  listSources(): SourceDetails[] {
    return this.sources.getSources().map(source => ({name: source.name}));
  }

  @Post()
  addSource() {
    // TODO: install a new source.
    return 'Add source';
  }

  @Get(':name')
  getSourceInfo(@Param('name') name: string) : SourceDetails {
    const source = this.sources.getSourceByName(name);
    if(!source) {
      throw new Error('source not installed.');
    }
    return {name: source.name};
  }

  @Get(':name/popular')
  getPopularPublications(
    @Param('name') name: string,
    @Query() cursor: Cursor,
  ) {
    return this.sources.popular(name, {page:1, perPage: 25, ...cursor});
  }

  @Get(':name/search')
  async searchPublications(@Param('name') name: string) {
    const source = this.sources.getSourceByName(name);
    const pageInfo = await source.search('', {page: 1, perPage: 10});
    return pageInfo;
  }

  @Get(':name/publications/:pub_id')
  async getPublication(
    @Param('name') name: string,
    @Param('pub_id') pub_id: string,
  ) {
    return this.sources.publication(name, pub_id);
  }

  @Get(':name/publications/:pub_id/chapters')
  async getPublicationChapters(
    @Param('name') name: string,
    @Param('pub_id') pub_id: string,
  ) {
    return this.sources.chapters(name, pub_id);
  }

  @Get(':name/publications/:pub_id/chapters/:chapter')
  async getPublicationChapterPages(
    @Param('name') name: string,
    @Param('pub_id') pub_id: string,
    @Param('chapter') chapter: string,
    @Query() cursor: Cursor,
  ) {
    return this.sources.pages(name, pub_id, chapter, {page: 1, perPage: 25, ...cursor});
  }
}
