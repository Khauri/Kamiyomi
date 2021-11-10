import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { HStack, Text } from '@chakra-ui/layout';
import { BsFilter } from 'react-icons/bs';
import { IoMdRefresh, IoMdSearch } from 'react-icons/io';
import React from 'react';

export default function PageHeader() {
  return (
    <HStack height={45} pl={4} justify="space-between">
      <Text>Library</Text>
      <HStack spacing={1}>
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={IoMdSearch}/>} />
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={BsFilter} />} />
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={IoMdRefresh} />} />
      </HStack>
    </HStack>
  );
}