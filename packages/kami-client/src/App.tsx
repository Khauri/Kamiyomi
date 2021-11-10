import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './routes/Home';
import PublicationPage from './routes/Publication';
import PublicationViewerPage from './routes/PublicationViewer';
import PublicationSourcePage from './routes/Source';
import PublicationSourcesPage from './routes/Sources';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Sources (maybe simplify?) I also want some kind of stack routing, so unsure about nested structure */}
          <Route path="sources" element={<PublicationSourcesPage />}>
            <Route path=":source" element={<PublicationSourcePage />}>
              <Route path="publications/:publication" element={<PublicationPage />}>
                <Route path="chapters/:chapter" element={<PublicationViewerPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
