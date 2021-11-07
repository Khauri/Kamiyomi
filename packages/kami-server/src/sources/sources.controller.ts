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
  async getPopularPublications(
    @Param('name') name: string,
    @Query() cursor : Cursor
  ) {
    console.log(cursor);
    const source = this.sources.getSourceByName(name);
    const pageInfo = await source.popular({page: 1, perPage: 25, ...cursor});
    return pageInfo;
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
    const publication = this.sources.getPublicationById(pub_id);
    const source = this.sources.getSourceByName(name);
    const details = await source.details(publication);
    return details;
  }

  @Get(':name/publications/:pub_id/chapters')
  async getPublicationChapters(
    @Param('name') name: string, 
    @Param('pub_id') pub_id: string
  ) {
    const publication = this.sources.getPublicationById(pub_id);
    const source = this.sources.getSourceByName(name);
    const chapters = await source.chapters(publication);
    return chapters;
  }

  @Get(':name/publications/:pub_id/chapters/:chapter')
  async getPublicationChapterPages(
    @Param('name') name: string, 
    @Param('pub_id') pub_id: string, 
    @Param('chapter') chapter: string,
  ) {
    const publication = this.sources.getPublicationById(pub_id);
    const source = this.sources.getSourceByName(name);
    const pages = await source.pages(null, publication, {page: 1, perPage: 10});
    return pages;
  }
}
