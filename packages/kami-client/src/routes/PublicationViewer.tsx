import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Img } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import ScrollView from '../atoms/ScrollView';
import api from '../services/api';

function PublicationPage({src, index, onViewPage} : any) {
  const {inView, ref} = useInView({threshold: 0, triggerOnce: true, rootMargin: '-50% 0px'});
  useEffect(() => {
    if(inView) {
      onViewPage?.(index);
    }
  }, [inView, onViewPage, index]);
  return (
    <Box ref={ref} outline="1px solid black" position="relative">
      <Img src={src}/>
    </Box>
  );
}

// This is the most important page that actually lets you read the publiction.
// TODO: use infinite query to load next chapter as you scroll.
// TODO: Add suite of settings to control how the publication is displayed as well as touch areas.
function PublicationViewerPage() {
  const {source, publication, chapter} = useParams();
  const key = `${source}.${publication}.${chapter}`;

  const {
    isLoading,
    data,
  } = useQuery(`${source}.${publication}.${chapter}`, () => {
    if(!source || !publication || !chapter) {
      return null;
    }
    return api.getChapterPages(source, publication, chapter)
  });

  const scrollViewRef = useRef(); 

  const [initialPage] = useState(Number(localStorage.getItem(key) || 1));

  useEffect(() => {
    console.log(scrollViewRef.current);
  }, []);

  const onViewPage = useCallback((index) => {
    const lastViewed = Number(localStorage.getItem(key)) || 1;
    if(index + 1 > lastViewed) {
      localStorage.setItem(key, index);
    }
  }, [key]);

  if(isLoading) return null;
  return (
    <ScrollView ref={scrollViewRef}>
      {data?.entries.map((page: any, index: number) => (
        <PublicationPage key={page.src} {...page} index={index} onViewPage={onViewPage}/>
      ))}
    </ScrollView>
  );
}

export default PublicationViewerPage;