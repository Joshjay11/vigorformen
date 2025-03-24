'use client';

import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component to render JSON-LD structured data
 * @param data - The JSON-LD data object
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
