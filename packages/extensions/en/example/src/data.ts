import * as faker from 'faker';
import {Publication} from 'kami-lib';

function fakePublication(): Publication {
  return {
    id: faker.datatype.uuid(),
    url: faker.image.abstract(),
    thumbnailUrl: faker.image.abstract(),
    genre: faker.random.word(),
    language: 'en-US',
    title: faker.random.words(3),
    author: faker.fake('{{name.firstName}} {{name.lastName}}'),
    artist: faker.fake('{{name.firstName}} {{name.lastName}}'),
    description: faker.lorem.paragraph(),
    lastUpdated: faker.date.past().toISOString(),
    chapters: [],
    initialized: true
  }
}

function fakePublications(count = 50): Publication[] {
  return Array.from({length: count}, () => fakePublication());
}

export default {
  "publications": fakePublications()
}
