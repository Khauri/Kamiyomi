import React from 'react';
import { Publication } from '../services/db';
import PublicationPreview from './PublicationPreview';

export default function PublicationGrid({publications}: any) {
  return (
    <>
      {
        publications.map((publication: Publication) => 
          (
            <PublicationPreview 
              key={publication.publication_id} 
              source={publication.source_id}
              thumbnailUrl={publication.thumbnail_url}
              url={publication.publication_id}
              {...publication} />
          )
        )
      }
    </>
  )
}