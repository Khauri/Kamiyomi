import React, { useState } from 'react';
import { Input, VStack, Container, Button, Text, useToast } from "@chakra-ui/react"
import api from '../services/api';

export default function SettingsPage() {
  const [server, setServer] = useState('');
  const toast = useToast()

  function saveForm() {
    api.setBaseURL(server);
    toast({
      title: 'Server updated',
      duration: 3000,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  }
  
  return (
    <Container maxWidth="container.md" py="3">
      <VStack alignItems="start">
        {/* TODO: Extrapolate this into a component */}
        <VStack width="100%" alignItems="start" my={3}>
          <Text fontSize="xs" width="75px" fontWeight="bold">Server</Text>
          <VStack flex={1} alignItems="start">
            <Input defaultValue={api.baseURL} variant="flushed" placeholder="https://kamiyomi.io/" onChange={(e) => setServer(e.target.value)} />
            <Text fontSize="sm" color="gray.500">
              The URL of the KamiYomi server you want to connect to. Different servers may offer different publication sources.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Make sure to only use the URL of a KamiYomi server that you trust.
            </Text>
          </VStack>
        </VStack>
        
        <Button alignSelf="start" onClick={saveForm}>Save</Button>
      </VStack>
    </Container>
  )
}