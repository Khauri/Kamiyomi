import {Module} from '@nestjs/common';
import {SourcesController} from './sources.controller';
import {SourcesService} from './sources.service';

@Module({
  imports: [],
  providers: [
    SourcesService,
  ],
  controllers: [SourcesController]
})
export class SourcesModule {}
