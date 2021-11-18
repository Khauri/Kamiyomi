import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { HStack, Text } from '@chakra-ui/layout';
import { BsFilter, BsArrowLeft } from 'react-icons/bs';
import { IoMdRefresh, IoMdSearch } from 'react-icons/io';

export default function PageHeader({title, canNavigateBack, onPressHeader}: any) {
  return (
    <HStack height={45} pl={4} justify="space-between">
      <HStack align="center" spacing={2} onClick={() => onPressHeader && onPressHeader()}>
        {canNavigateBack && <Icon as={BsArrowLeft}/>} 
        <Text>{title}</Text>
      </HStack>
      <HStack spacing={1}>
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={IoMdSearch}/>} />
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={BsFilter} />} />
        <IconButton aria-label="Search" bg="transparent" icon={<Icon as={IoMdRefresh} />} />
      </HStack>
    </HStack>
  );
}