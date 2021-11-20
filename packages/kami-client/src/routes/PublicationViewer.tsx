import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Img, Center } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import ScrollView from '../atoms/ScrollView';
import api from '../services/api';
import pubs from '../services/pubs';

function slugify(str: string = '') {
  return str.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function PublicationPage({src, index, chapter, onViewPage, onImgLoad} : any) {
  const {inView, ref} = useInView({threshold: 0, triggerOnce: true, rootMargin: '-50% 0px'});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if(inView) {
      onViewPage?.(chapter, index);
    }
  }, [inView, onViewPage, index]);
  // TODO: Figure out a more sophisticated placeholder strategy
  return (
    <Box ref={ref} outline="1px solid black" position="relative" minHeight={loaded ? 0 : "100vh"}>
      <Img id={slugify(src)} 
        src={src} 
        onLoad={(...args) => {
          setLoaded(true); 
          onImgLoad?.(...args);
        }}/>
    </Box>
  );
}

// This is the most important page that actually lets you read the publiction.
// TODO: use infinite query to load next chapter as you scroll.
// TODO: Add suite of settings to control how the publication is displayed as well as touch areas.
function PublicationViewerPage() {
  const {source, publication, chapter} = useParams();

  // Get the list of chapters again
  const {isLoading: isLoadingChapters, data: chapterList} = useQuery(`${source}.${publication}.chapters`, () => {
    if(!source || !publication) {
      return [];
    }
    return api.getChaptersList(source, publication);
  }, {refetchOnWindowFocus: false});

  // const {
  //   isLoading,
  //   data,
  // } = useQuery(`${source}.${publication}.${chapter}`, () => {
  //   if(!source || !publication || !chapter) {
  //     return null;
  //   }
  //   return api.getChapterPages(source, publication, chapter)
  // }, {refetchOnWindowFocus: false});

  const {
    isLoading,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    data,
    fetchNextPage,
  } = useInfiniteQuery(
    `${source}.${publication}`, 
    async ({pageParam = chapter}) => {
      if(!source || !publication || !chapter) return {};
      console.log(`Loading Next Chapter: ${pageParam}`);
      return {
        chapter_id: pageParam,
        pages: await api.getChapterPages(source, publication, pageParam),
      };
    }, 
    {
      getNextPageParam : (lastPage) => {
        const index = chapterList?.findIndex(c => c.id === lastPage.chapter_id);
        if(!index || index < 0) return undefined;
        const nextPage = chapterList?.[index - 1];
        if(!nextPage) return undefined;
        return nextPage.id;
      },
      enabled: !isLoadingChapters,
      refetchOnWindowFocus: false,
    }
  );

  const scrollViewRef = useRef<HTMLDivElement>(null); 

  // Jumps to the most recent page upon loading
  useQuery(`${source}.${publication}.${chapter}.current_page`, async () => {
    if(!publication || !chapter) {
      return null;
    }
    // FIXME: This creates a race condition and I'm not 100% sure how to fix it
    const progress = await pubs.getChapterProgress(publication, chapter);
    const {current} = scrollViewRef;
    const chapterPages = data?.pages.find(page => page.chapter_id === chapter);
    if(!chapterPages) return;
    const page = chapterPages.pages.entries[(progress?.pages_read || 1) - 1];
    const pageEl = page?.src && current?.querySelector(`#${slugify(page.src)}`);
    pageEl?.scrollIntoView({block:'start', inline: 'start'});
  }, {refetchOnWindowFocus: false, enabled: !isLoading});

  const onViewPage = useCallback(async (chapter, index) => {
    if(!publication || !chapter || !source) {
      return;
    }
    const chapterNumber = chapterList?.reverse().findIndex(c => c.id === chapter) || 0;
    await Promise.all([
      pubs.updateChapterProgress(publication, chapter, index, 20),
      pubs.updatePublicationHistory(publication, source, chapterNumber + 1, chapter),
    ]);
  }, [publication, source, chapterList]);

  const onLoadMore = () => {
    fetchNextPage();
  };

  if(isLoading) return null;

  return (
    <ScrollView minHeight="100%" ref={scrollViewRef} onScrollToBottom={onLoadMore} isFetchingNextPage={isFetchingNextPage}>
      {
        data?.pages.map(chapter => (
          <React.Fragment key={chapter.chapter_id}>
            {
              chapter.pages.entries.map((page: any, index: number) => (
                <PublicationPage 
                  key={page.src} 
                  src={page.src} 
                  chapter={chapter.chapter_id} 
                  index={index} 
                  onViewPage={onViewPage}
                />
              ))
            }
            <Center>Next Chapter</Center>
          </React.Fragment>
        ))
      }
    </ScrollView>
  );
}

export default PublicationViewerPage;