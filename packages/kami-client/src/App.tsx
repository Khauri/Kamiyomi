import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PageLayout from './layouts/PageLayout';

import Home from './routes/Home';
import PublicationPage from './routes/Publication';
import PublicationViewerPage from './routes/PublicationViewer';
import PublicationSourcePage from './routes/Source';
import PublicationSourcesPage from './routes/Sources';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            {/* Sources (maybe simplify?) I also want some kind of stack routing, so unsure about nested structure */}
            <Route path="sources" element={<PublicationSourcesPage />} />
            <Route path="sources/:source" element={<PublicationSourcePage />}/>
            <Route path="sources/:source/publications/:publication" element={<PublicationPage />} />
            <Route path="sources/:source/publications/:publication/chapters/:chapter" element={<PublicationViewerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >
  );
}

export default App;
