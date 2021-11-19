import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router';
import { Flex, Box } from '@chakra-ui/layout';
import PublicationPreview from '../molecules/PublicationPreview';
import api from '../services/api';
import ScrollView from '../atoms/ScrollView';

function PublicationSourcePage() {
  const {source} = useParams();
  const {
    isLoading,
    isFetchingNextPage,
    isError,
    data,
    fetchNextPage,
  } = useInfiniteQuery(
    `${source}.popular`,
    async ({pageParam = 1}) => {
      if(!source) {
        return null
      }
      console.log('Loading next page', pageParam);
      const results = await api.getPopular(source, {page: pageParam});
      return {cursor: pageParam + 1, results};
    },
    { 
      getNextPageParam: (lastPage) => {
        if(!lastPage?.results.hasNextPage) {
          return undefined;
        }
        return lastPage.cursor;
      }
    },
  );

  if(isLoading) {
    return <div>Loading...</div>;
  }

  if(isError) {
    return <div>Not found</div>;
  }

  return (
    <ScrollView as={Flex} wrap="wrap" onScrollToBottom={fetchNextPage}>
      {data?.pages.map((pageInfo, i) => (
        <React.Fragment key={i}>
          {pageInfo?.results.entries.map((publication: any) => (
            <PublicationPreview key={publication.url} source={source} {...publication} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <Box width="100%" height="1000px">Loading...</Box>}
    </ScrollView>
  );
}

export default PublicationSourcePage;