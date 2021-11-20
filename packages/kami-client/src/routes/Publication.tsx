import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Text, Heading, Container, VStack, HStack, List, ListItem, LinkBox, LinkOverlay, IconButton, Icon, useToast } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';


import api from '../services/api';
import { PublicationThumbnail } from '../molecules/PublicationPreview';
import { Link } from 'react-router-dom';
import pubs from '../services/pubs';
import { ChapterProgess } from '../services/db';

function PublicationHeader({title, author, artist, thumbnailUrl, description, source_id, publication_id}: any) {
  const toast = useToast();
  const onFavorite = async () => {
    const category = 'Favorites';
    await pubs.addPublicationToCategory(publication_id, source_id, category);
    toast({
      title: `${title} added to ${category}`,
      duration: 3000,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <VStack>
      <HStack alignItems="start" w="100%">
        <PublicationThumbnail flex={1} src={thumbnailUrl} title={title}/>
        <VStack flex="3" alignItems="start" spacing={0.5}>
          <Heading fontSize="md" fontWeight="bold">{title}</Heading>
          <Text>Author: {author}</Text>
          <Text>Artist: {artist}</Text>
        </VStack>
      </HStack>
      <HStack alignItems="start" width="100%">
        <IconButton onClick={onFavorite} aria-label={'Toggle Publication Favorite'} icon={<Icon as={FaHeart} />}/>
      </HStack>
      <VStack>
        {/* Might want to find a better way to do this lol. */}
        <Text dangerouslySetInnerHTML={{__html: description}} />
      </VStack>
    </VStack>
  )
}

function ChapterPagesReadCounter({progress, id}: any) {
  if(!progress.has(id)) return null;
  const {pages_read} = progress.get(id) as ChapterProgess;
  return (
    <Text as="span" ms={2} color="gray.500">
      Page: {pages_read}
    </Text> 
  )
}

function ChapterListItem({chapter, source, publication, progress}: any) {
  return (
    <LinkBox w={"100%"} as={ListItem} key={chapter.id} py={3}>
      <VStack w={"100%"} alignItems="start" spacing={0}>
        <LinkOverlay w={"100%"} as={Link} to={`/browse/${source}/publications/${encodeURIComponent(publication)}/chapters/${encodeURIComponent(chapter.id)}`}>
          <Text fontSize="sm" key={chapter.id} fontWeight="bold">
            {chapter.title}
          </Text>
        </LinkOverlay>
        <Text fontSize="sm" color="gray.500">
          {chapter.released} <ChapterPagesReadCounter progress={progress} id={chapter.id} />
        </Text>
      </VStack>
    </LinkBox>
  )
}

function ChapterList() {
  const {source, publication} = useParams();
  const {isLoading, data} = useQuery(`${source}.chapters`, () => {
    if(!source || !publication) return null;
    return api.getChaptersList(source, publication);
  });

  const {data: chapterReadData} = useQuery(`${source}.chapter-data`, async () => {
    const chapterProgressMap: Map<string, ChapterProgess> = new Map();
    if(!publication) return chapterProgressMap;
    const data = await pubs.getAllChapterProgress(publication);
    return data.reduce((acc: Map<string, ChapterProgess>, chapter: ChapterProgess) => {
      acc.set(chapter.chapter_id, chapter);
      return acc;
    }, chapterProgressMap);
  });

  // console.log(chapterReadData);

  if(!source || !publication) return null;
  if(isLoading) return <Text>Loading...</Text>;

  return (
    <VStack alignItems="start" w={"100%"}>
      <Text fontSize="sm" fontWeight="bold">{data?.length} Chapters</Text>
      <List w={"100%"}>
        {data?.map((chapter: any) => (
          <ChapterListItem key={chapter.id} chapter={chapter} source={source} publication={publication} progress={chapterReadData}/>
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
  }, {refetchOnWindowFocus: false});
  if(isLoading) return <Text>Loading...</Text>;
  return (
    <Container>
      <VStack alignItems="start" spacing={4}>
        <PublicationHeader {...data} source_id={source} publication_id={publication} />
        <ChapterList />
      </VStack>
    </Container>
  );
}

export default PublicationPage;