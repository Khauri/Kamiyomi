import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Text} from "@chakra-ui/react"
// import PublicationPreview from '../molecules/PublicationPreview';

// This page shows you publications you have saved
function HomePage() {
  // TODO: Show library of saved publications (grab from indexedDB)
  return (
    <Tabs>
      <TabList>
        <Tab>Default</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <Center>
            <Text color="gray.500">Nothing to see here yet</Text>
          </Center>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default HomePage;