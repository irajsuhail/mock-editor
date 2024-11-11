'use client';
import './globals.css';

import { OpenEditorsProvider } from '@/context/OpenEditorsContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { BranchProvider } from '@/context/BranchContext';
import { useIsClient } from '@uidotdev/usehooks';

export default function RootLayout({ children }) {
  const isClient = useIsClient();

  if (isClient === false) {
    return null;
  }

  return (
    <html lang="en">
      <head>
        <title>VS Code - Mock</title>
        <meta
          name="description"
          content="VS code mock editor with some base functionality to view and edit local stored files."
        />
      </head>
      <body>
        <ThemeProvider>
          <BranchProvider>
            <OpenEditorsProvider>{children}</OpenEditorsProvider>
          </BranchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
