import React from 'react';
import { VStack, Box } from '@chakra-ui/layout';
import PageHeader from '../molecules/PageHeader';

export default function PageLayout({children} : any) {
  return (
    <VStack spacing={0} height={"100vh"} width={"100vw"} align="stretch">
      <PageHeader />
      <Box flex={1}>
        {children}
      </Box>
    </VStack>
  );
}