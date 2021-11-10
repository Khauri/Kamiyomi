import { AspectRatio, Box } from '@chakra-ui/layout';
import React from 'react';

function PublicationThumbnail() {
  return (
    <div>Wow!</div>
  );
}

function PublicationPreview() {
  return (
    <Box minWidth="50%" p={1} overflow="hidden">
      <AspectRatio borderRadius="sm" ratio={9/13} bg="white" position="relative">
        <PublicationThumbnail />
      </AspectRatio>
    </Box>
  );
}

export default PublicationPreview;
