import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import lib from '../services/lib';
import ScrollView from '../atoms/ScrollView';
import PublicationGrid from '../molecules/PublicationGrid';
// import PublicationPreview from '../molecules/PublicationPreview';

// This page shows you publications you have saved
function HomePage() {
  const {isLoading, data} = useQuery('library.favorites', async () => {
    const result = await lib.getCategoriesAndPublications();
    if(!result?.length) {
      return [{id: 0, name: 'Default', publications: []}];
    }
    return result;
  }, {refetchOnWindowFocus: false});

  if(isLoading) return null;

  return (
    <Tabs>
      <TabList>
        {
          data?.map(category => <Tab key={`panel-${category.id}`}>{category.name}</Tab>)
        }
      </TabList>

      <TabPanels>
        {
          data?.map(category => 
            ( 
              <TabPanel key={`panel-${category.id}`} px={0}>
                <ScrollView as={Flex} wrap="wrap">
                  <PublicationGrid publications={category.publications}/>
                </ScrollView>
              </TabPanel>
            )
          )
        }
      </TabPanels>
    </Tabs>
  );
}

export default HomePage;