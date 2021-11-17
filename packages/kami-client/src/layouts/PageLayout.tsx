import React from 'react';
import { VStack, Box } from '@chakra-ui/layout';
import PageHeader from '../molecules/PageHeader';
import { Outlet } from 'react-router';
import { Tabs, Tab, TabList } from '@chakra-ui/tabs';
import { Text, Flex, Icon } from '@chakra-ui/react';
import {FaBookOpen, FaCompass} from 'react-icons/fa'
import {GrCircleAlert} from 'react-icons/gr';
import {RiHistoryFill} from 'react-icons/ri';
import {HiDotsHorizontal} from 'react-icons/hi';


function NavigatorButton({title, icon}: any) {
  return (
    <Flex direction="column" align="center" justify="center">
      <Icon as={icon} />
      <Text fontSize="xs">{title}</Text>
    </Flex>
  )
}


export default function PageLayout() {
  return (
    <VStack spacing={0} height={"100vh"} width={"100vw"} align="stretch">
      <PageHeader />
      <Box flex={1} overflowX="auto">
        <Outlet />
      </Box>
      <Tabs align="center" isFitted>
        <TabList>
          <Tab><NavigatorButton title="Library" icon={FaBookOpen}/></Tab>
          <Tab><NavigatorButton title="Updates" icon={GrCircleAlert}/></Tab>
          <Tab><NavigatorButton title="History" icon={RiHistoryFill}/></Tab>
          <Tab><NavigatorButton title="Browse" icon={FaCompass}/></Tab>
          <Tab><NavigatorButton title="More" icon={HiDotsHorizontal}/></Tab>
        </TabList>
      </Tabs>
    </VStack>
  );
}