import React from 'react';
import { useQuery } from 'react-query';
import {Container, VStack, Box, HStack, Text, IconButton, Icon, LinkOverlay, LinkBox } from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import pubs from '../services/pubs';
import { Publication } from '../services/db';
import { PublicationThumbnail } from '../molecules/PublicationPreview';

type PublicationHistoryEntryProps = Publication & {}

function PublicationHistoryEntry({title, thumbnail_url, source_id, publication_id, history}: PublicationHistoryEntryProps) {
  return (
    <LinkBox as={HStack} w="100%" spacing={4}>
      <PublicationThumbnail flex="1" title={title} src={thumbnail_url}/>
      <VStack flex="6" alignItems="start" spacing="0">
        {/* TODO: Make this a standalone thing so it can be opened without opening the browse page? */}
        <LinkOverlay as={Link} to={`/browse/${source_id}/publications/${encodeURIComponent(publication_id)}`}>
          <Text fontWeight="bold">{title}</Text>
        </LinkOverlay>
        <Text>{history?.last_chapter_number} {history?.last_viewed_at?.toLocaleDateString()}</Text>
      </VStack>
      <HStack>
        <IconButton icon={<Icon />} aria-label={`Remove ${title}`} />
        <IconButton icon={<Icon />} aria-label={`Continue reading ${title}`} />
      </HStack>
    </LinkBox>
  )
}

export default function PublicationHistory() {
  const {isLoading, data} = useQuery(`publication.history`, () => {
    return pubs.getPublicationHistory();
  }, {refetchOnWindowFocus: false})

  if (isLoading) return null;

  return (
    <Container>
      <VStack alignItems="start" spacing={3}>
        {
          data.map((pub: Publication) => 
            <PublicationHistoryEntry key={pub.publication_id} {...pub} />
          )
        }
      </VStack>
    </Container>
  );
}
