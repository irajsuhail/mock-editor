import React from 'react';

export default function SectionHeader({ children }) {
  return (
    <p className="p-2 bg-gray-100 dark:bg-gray-800 w-full text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
      {children}
    </p>
  );
}
