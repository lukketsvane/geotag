"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import RootLayout from './layout';

const MapWithNoSSR = dynamic(() => import('./components/MapComponent.tsx'), {
  ssr: false,
});

export default function Home() {
  return (
    <RootLayout>
      <MapWithNoSSR />
    </RootLayout>
  );
}
