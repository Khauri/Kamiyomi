import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Flex } from '@chakra-ui/layout';
import PublicationPreview from '../molecules/PublicationPreview';

function PublicationSourcePage() {
  const {source} = useParams();
  const {isLoading, data: pageInfo} = useQuery(`${source}.popular`, async () => {
    const result = await fetch(`http://localhost:3001/sources/${source}/popular`);
    return result.json();
  });

  if(isLoading) {
    return <div>Loading...</div>;
  }

  console.log(pageInfo);
  
  return (
    <div className="App">
      <Flex wrap="wrap">
        {pageInfo.entries.map((publication: any) => (<PublicationPreview key={publication.url} {...publication} />))}
      </Flex>
    </div>
  );
}

export default PublicationSourcePage;