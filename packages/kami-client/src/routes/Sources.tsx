import React, { useEffect } from 'react';
import { Box, Container, Heading, Drawer, DrawerOverlay, useDisclosure, DrawerContent} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link, Route, Routes, useNavigate, useMatch } from 'react-router-dom';
import PublicationSourcePage from './Source';
import PublicationPage from './Publication';
import PublicationViewerPage from './PublicationViewer';
import api from '../services/api';
import PageHeader from '../molecules/PageHeader';

function PublicationSource({name}: any) {
  return (
    <Box p={2}>
      <Link to={`/browse/${name}`}>{name}</Link>
    </Box>
  );
}

function PublicationSources() {
  const {isLoading, data: sources} = useQuery('publication_sources', () => api.getSources());

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="App">
      <Heading size="lg" fontWeight="bold">Publication Sources</Heading>
      {sources.map((source: any) => <PublicationSource key={source.name} {...source} />)}
    </Container>
  );
}

function NavigationStack({children}: any) {
  const {isOpen, onClose, onOpen} = useDisclosure({defaultIsOpen: false});
  // Temporary becaues idrk how to do this otherwise
  const match = useMatch('/browse/:anything_not_root/*');

  const navigate = useNavigate();

  const onBack = () => { 
    navigate(-1);
  };

  useEffect(() => {
    if(match) {
      onOpen();
    } else {
      onClose();
    }
  }, [match]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <PageHeader title="Source" canNavigateBack onPressHeader={onBack}/>
        <Box flex={1} overflowX="auto">
          {children}
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

function PublicationSourcesPage() {
  return (
    <>
      <PublicationSources />
      <NavigationStack>
        <Routes>
          <Route path=":source" element={
            <PublicationSourcePage />
          }/>
          <Route path=":source/publications/:publication" element={
            <PublicationPage />
          } />
          <Route path=":source/publications/:publication/chapters/:chapter" element={
            <PublicationViewerPage />
          } />
        </Routes>
      </NavigationStack>
    </>
  )
}

export default PublicationSourcesPage;