import React from 'react';
import { Box, Container, Heading, Drawer, DrawerBody, DrawerOverlay, useDisclosure, DrawerContent} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
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

function AltLayout({children}: any) {
  const navigate = useNavigate();
  const {isOpen, onClose} = useDisclosure({defaultIsOpen: true, onClose: () => navigate(-1)});
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <PageHeader title="Source" canNavigateBack onPressHeader={onClose}/>
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
      <Routes>
        <Route index element={<PublicationSources />}/>
      </Routes>
      <Routes>
        <Route path=":source" element={
          <AltLayout><PublicationSourcePage /></AltLayout>
        }/>
        <Route path=":source/publications/:publication" element={<PublicationPage />} />
        <Route path=":source/publications/:publication/chapters/:chapter" element={<PublicationViewerPage />} />
      </Routes>
    </>
  )
}

export default PublicationSourcesPage;