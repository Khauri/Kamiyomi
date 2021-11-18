import React, {useState} from 'react';
import PageHeader from '../molecules/PageHeader';
import { Outlet, useMatch, useNavigate } from 'react-router';
import { Tabs, Tab, TabList } from '@chakra-ui/tabs';
import { Text, Flex, Icon, VStack, Box } from '@chakra-ui/react';
import {FaBookOpen, FaCompass} from 'react-icons/fa'
import {GrCircleAlert} from 'react-icons/gr';
import {RiHistoryFill} from 'react-icons/ri';
import {HiDotsHorizontal} from 'react-icons/hi';

const navigation = [
  {title: 'Library', icon: FaBookOpen, route: ''},
  {title: 'Updates', icon: GrCircleAlert, route: 'updates'},
  {title: 'History', icon: RiHistoryFill, route: 'history'},
  {title: 'Browse', icon: FaCompass, route: 'browse'},
  {title: 'More', icon: HiDotsHorizontal, route: 'settings'},
]

function NavigatorButton({title, icon}: any) {
  return (
    <Flex direction="column" align="center" justify="center">
      <Icon as={icon} />
      <Text fontSize="xs">{title}</Text>
    </Flex>
  )
}

export default function PageLayout() {
  const match = useMatch('/:route/*');
  const navigate = useNavigate();
  
  let defaultIndex = 0;
  if(match?.params.route) {
    defaultIndex = navigation.findIndex(item => item.route.toLowerCase() === match.params.route?.toLowerCase());
  }

  const [activeTab, setActiveTab] = useState(navigation[defaultIndex]);

  function navigateByTabIndex(index: number) {
    if(typeof navigation[index] === 'undefined') {
      return;
    }
    navigate(`/${navigation[index].route}`);
    setActiveTab(navigation[index]);
  }

  return (
    <VStack spacing={0} height={"100vh"} width={"100vw"} align="stretch">
      <PageHeader title={activeTab.title} />
      <Box flex={1} overflowX="auto">
        <Outlet />
      </Box>
      <Tabs align="center" defaultIndex={defaultIndex} onChange={navigateByTabIndex} isFitted>
        <TabList>
          {navigation.map((item) => (
            <Tab key={item.title}><NavigatorButton {...item} /></Tab>
          ))}
        </TabList>
      </Tabs>
    </VStack>
  );
}