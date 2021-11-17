import React from 'react';
import { Box } from '@chakra-ui/layout';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function PublicationSource({name}: any) {
  return (
    <Box>
      <Link to={`/sources/${name}`}>{name}</Link>
    </Box>
  );
}

function PublicationSourcesPage() {
  const {isLoading, data: sources} = useQuery('publication_sources', async () => {
    const result = await fetch('http://localhost:3001/sources');
    return result.json();
  });

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">Publication Sources</header>
      {sources.map((source: any) => <PublicationSource key={source.name} {...source} />)}
    </div>
  );
}

export default PublicationSourcesPage;