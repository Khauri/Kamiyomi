import React from 'react';
import { AspectRatio, Box, Flex, Image, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function PublicationThumbnail({src, title}: any) {
  return (
    <Box position="relative">
      <Image src={src} alt={`Thumbnail image for ${title}`} objectFit="cover" w="100%" h="100%" />
      <Box position="absolute" inset={0} bgGradient="linear(to-t, gray.800, transparent 30%)" />
    </Box>
  );
}

function PublicationPreview({thumbnailUrl, title, source, url}: any) {
  return (
    <LinkBox minWidth={["50%", "33%", "25%", "16.5%"]} p={1} position="relative">
      <AspectRatio borderRadius="sm" overflow="hidden" ratio={9/13} bg="white" position="relative">
        <PublicationThumbnail src={thumbnailUrl} title={title} />
      </AspectRatio>
      <Flex position={"absolute"} p="2" top={0} right={0} bottom={0} left={0} align={"flex-end"} justify={"flex-start"}>
        <LinkOverlay as={Link} to={`/browse/${source}/publications/${encodeURIComponent(url)}`}>
          <Text color="white" fontSize="xs" fontWeight="bold" textShadow="1px 1px rgba(0,0,0,0.8)">{title}</Text>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  );
}

export default PublicationPreview;
