import React from 'react';
import PageLayout from '../layouts/PageLayout';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react"
import PublicationPreview from '../molecules/PublicationPreview';

import Sources from './Sources';

// This page shows you publications you have saved
function HomePage() {
  // TODO: Show library of saved publications
  return (
    <Tabs>
      <TabList>
        <Tab>Default</Tab>
        {/* Temporary */}
        <Tab>Sources</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <Flex wrap="wrap">
            {Array.from({ length: 10 }).map((_, i) => (<PublicationPreview key={i}/>))}
          </Flex>
        </TabPanel>
        {/* Temporary */}
        <TabPanel>
          <Sources />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default HomePage;