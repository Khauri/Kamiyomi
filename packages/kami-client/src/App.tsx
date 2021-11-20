import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PageLayout from './layouts/PageLayout';

import HomePage from './routes/Home';
import SettingsPage from './routes/Settings';
import BrowsePage from './routes/Sources';
import HistoryPage from './routes/History';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="history/*" element={<HistoryPage />} />
            <Route path="browse/*" element={<BrowsePage />} />
            <Route path="settings/*" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >
  );
}

export default App;
