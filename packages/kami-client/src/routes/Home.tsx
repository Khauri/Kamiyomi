import React from 'react';
import PageLayout from '../layouts/PageLayout';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react"
import PublicationPreview from '../molecules/PublicationPreview';

// This page shows you publications you have saved
function HomePage() {
  // TODO: Show library of saved publications
  return (
    <PageLayout>
      <Tabs>
        <TabList>
          <Tab>Default</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Flex wrap="wrap">
              {Array.from({ length: 10 }).map((_, i) => (<PublicationPreview key={i}/>))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageLayout>
  );
}

export default HomePage;