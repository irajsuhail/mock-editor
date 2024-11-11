# Mock Editor - VS Code

A VS Code mock editor with basic functionality to view and edit locally stored files.

## Requirements

Anything above the following version of Nodejs

```
nodejs 18.17.0
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to use this project

1. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionalities

The project has implemented the following functionalities:

- **Generate File Structure**: It generates the file structure and displays it in the sidebar for easy navigation.
- **Open Files**: Any file can be opened in the VS Code-like editor. The project saves `openWorksheets` in localStorage to persist changes.
- **Edit Files**: Users can edit files, with all changes saved locally in `openWorksheets` in localStorage to ensure persistence.
- **View Changes**: The project features a fully implemented diff editor to compare the edited content with the original content from the worksheets, allowing users to track changes.
- **Switch Branches**: Switching branches resets the `openWorksheets` in localStorage to match the provided JSON.
- **Themes**: The project fully supports dark, light, and system-preferred themes, offering users a customizable visual experience.
