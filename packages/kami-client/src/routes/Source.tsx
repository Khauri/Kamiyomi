import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Flex } from '@chakra-ui/layout';
import PublicationPreview from '../molecules/PublicationPreview';
import api from '../services/api';

function PublicationSourcePage() {
  const {source} = useParams();
  const {isLoading, data: pageInfo, isError} = useQuery(`${source}.popular`, () => source && api.getPopular(source));

  if(isLoading) {
    return <div>Loading...</div>;
  }

  if(isError || !pageInfo) {
    return <div>Not found</div>;
  }

  return (
    <div className="App">
      <Flex wrap="wrap">
        {pageInfo.entries.map((publication: any) => (<PublicationPreview key={publication.url} {...publication} />))}
      </Flex>
    </div>
  );
}

export default PublicationSourcePage;