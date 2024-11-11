'use client';

import files from '../../public/data/files.json';
import generateFilesTree, { getLanguage } from '@/utils/generateFilesTree';
import FilesystemItem from '@/components/ui/FileSystemItem';
import MonacoEditor from '@/components/code/MonacoEditor';
import { useOpenEditors } from '@/context/OpenEditorsContext';
import useHandleFileButtonClick from '@/hooks/useHandleFileButtonClick';
import { useEffect, useCallback } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import BranchSwitcher from '@/components/code/BranchSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useBranch } from '@/context/BranchContext';
import OpenEditorsSection from '@/components/code/OpenEditorsSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import Image from 'next/image';

let filesSystem = generateFilesTree(files.data.files);

export default function Home() {
  const { openFiles, closeEditor, selectedFile, openEditors } =
    useOpenEditors();
  const handleFileButtonClick = useHandleFileButtonClick();
  const [, setStoredWorksheets] = useLocalStorage('openWorksheets', []);
  const { currentBranch, loading, error } = useBranch();

  const fetchWorkSheets = useCallback(async () => {
    try {
      console.log('Fetching worksheets');
      const response = await fetch('/data/open-worksheets.json');
      const data = await response.json();
      const workSheets = data.activeWorksheets.map((worksheet) => ({
        ...worksheet,
        language: getLanguage(worksheet?.relativePath),
      }));

      setStoredWorksheets(workSheets);
      openEditors(workSheets);
    } catch (error) {
      console.error('Error fetching worksheets:', error);
    }
  }, []);

  useEffect(() => {
    fetchWorkSheets();
  }, [currentBranch]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="icons/branch.svg"
              width={120}
              height={120}
              alt="Illustration for loading state of branch"
            />
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-400 text-center">
              Loading Branch
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="icons/cross.svg"
              width={120}
              height={120}
              alt="Illustration for error"
            />
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-400 text-center">
              Something went wrong
            </p>
          </div>
        </div>
      ) : (
        <>
          <ReflexContainer orientation="vertical" className="code-container">
            <ReflexElement className="left-pane" minSize={240} size={320}>
              <div className="pane-content w-full col-span-1 grid grid-rows-8 code-container">
                <OpenEditorsSection
                  data={openFiles}
                  selectedFile={selectedFile}
                  onClick={handleFileButtonClick}
                  onClose={(file) => closeEditor(file)}
                />
                <div className="row-span-6 pb-8">
                  <SectionHeader>{filesSystem[0].name}</SectionHeader>
                  <div className="ps-2 overflow-y-auto h-full">
                    {filesSystem[0]?.children?.map((item) => (
                      <FilesystemItem item={item} key={item.name} />
                    ))}
                  </div>
                </div>
              </div>
            </ReflexElement>
            <ReflexSplitter className="opacity-50" />
            <ReflexElement className="right-pane" minSize={240}>
              <div className="pane-content col-span-5 h-full border border-gray-200 dark:border-gray-900">
                <MonacoEditor />
              </div>
            </ReflexElement>
          </ReflexContainer>
        </>
      )}
      <div className="h-8 overflow-hidden flex items-center justify-between px-5 border border-gray-200 bg-gray-100 dark:bg-gray-950 dark:border-gray-900 text-black dark:text-gray-400 z-10">
        <BranchSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
