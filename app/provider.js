"use client";
import { useUser } from '@clerk/nextjs';
import React from 'react';

function Provider({ children }) {
  const { user } = useUser();

  return (
    <div>
      {children}
    </div>
  );
}

export default Provider;