import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { AspectRatio, Text, Heading, Container, VStack, HStack, List, ListItem, LinkBox, LinkOverlay } from '@chakra-ui/react';
import api from '../services/api';
import { PublicationThumbnail } from '../molecules/PublicationPreview';
import { Link } from 'react-router-dom';

function PublicationHeader({title, author, artist, thumbnailUrl, description}: any) {
  return (
    <VStack>
      <HStack alignItems="start" w="100%">
        <AspectRatio flex="1" borderRadius="sm" overflow="hidden" ratio={9/13} bg="white" position="relative">
          <PublicationThumbnail src={thumbnailUrl} title={title}/>
        </AspectRatio>
        <VStack flex="3" alignItems="start">
          <Heading fontSize="md" fontWeight="bold">{title}</Heading>
          <Text>Author: {author}</Text>
          <Text>Artist: {artist}</Text>
        </VStack>
      </HStack>
      <HStack></HStack>
      <VStack>
        {/* Might want to find a better way to do this lol. */}
        <Text dangerouslySetInnerHTML={{__html: description}} />
      </VStack>
    </VStack>
  )
}

function ChapterList() {
  const {source, publication} = useParams();
  const {isLoading, data} = useQuery(`${source}.chapters`, () => {
    if(!source || !publication) return null;
    return api.getChaptersList(source, publication);
  });
  if(!source || !publication) return null;
  if(isLoading) return <Text>Loading...</Text>;
  return (
    <VStack alignItems="start" w={"100%"}>
      <Text fontSize="sm" fontWeight="bold">{data.length} Chapters</Text>
      <List w={"100%"}>
        {data.map((chapter: any) => (
          <LinkBox w={"100%"} as={ListItem} key={chapter.id} py={3}>
            <VStack w={"100%"} alignItems="start" spacing={0}>
              <LinkOverlay w={"100%"} as={Link} to={`/browse/${source}/publications/${encodeURIComponent(publication)}/chapters/${encodeURIComponent(chapter.id)}`}>
                <Text fontSize="sm" key={chapter.id} fontWeight="bold">{chapter.title}</Text>
              </LinkOverlay>
              <Text fontSize="sm" color="gray.500">{chapter.released}</Text>
            </VStack>
          </LinkBox>
        ))}
      </List>
    </VStack>
  );
}

function PublicationPage() {
  const {source, publication} = useParams();
  const {isLoading, data} = useQuery(`${source}.details`, () => {
    if(!source || !publication) return null;
    return api.getDetails(source, publication);
  });
  if(isLoading) return <Text>Loading...</Text>;
  console.log(data);
  return (
    <Container>
      <VStack alignItems="start">
        <PublicationHeader {...data} />
        <ChapterList />
      </VStack>
    </Container>
  );
}

export default PublicationPage;