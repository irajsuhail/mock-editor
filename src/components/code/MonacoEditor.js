import { useOpenEditors } from '@/context/OpenEditorsContext';
import Editor, { DiffEditor } from '@monaco-editor/react';
import Image from 'next/image';
import useHandleFileButtonClick from '@/hooks/useHandleFileButtonClick';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLocalStorage, useDebounce } from '@uidotdev/usehooks';
import EditorTabs from './EditorTabs';

export default function MonacoEditor() {
  const [content, setContent] = useState('');
  const [showDiffEditor, setShowDiffEditor] = useState(false);
  const { selectedFile, openFiles, closeEditor } = useOpenEditors();
  const handleFileButtonClick = useHandleFileButtonClick();
  const { activeTheme } = useTheme();
  const debouncedContent = useDebounce(content, 1000);
  const [worksheets, setWorksheets] = useLocalStorage('openWorksheets', []);

  const theme = activeTheme === 'light' ? 'light' : 'vs-dark';

  // Update worksheets when selectedFile changes
  useEffect(() => {
    setShowDiffEditor(false);

    if (selectedFile) {
      setContent(selectedFile.modifiedContent || '');
    }
  }, [selectedFile]);

  // Update worksheets when content changes
  useEffect(() => {
    if (selectedFile) {
      setWorksheets((prevWorksheets) =>
        prevWorksheets.map((worksheet) => {
          if (worksheet.relativePath === selectedFile.relativePath) {
            return { ...worksheet, modifiedContent: debouncedContent };
          }
          return worksheet;
        }),
      );
    }
  }, [debouncedContent]);

  const handleOnChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <>
      {selectedFile ? (
        <div className="flex flex-col h-full">
          <div className="flex gap-3 items-center justify-between">
            <EditorTabs
              data={openFiles}
              selectedFile={selectedFile}
              onClick={handleFileButtonClick}
              onClose={closeEditor}
            />
            <button
              className="p-2 hover:bg-blue-50 dark:hover:bg-gray-900 border-s border-gray-200 dark:border-gray-800 transition"
              title="View Changes - Diff"
              onClick={() => setShowDiffEditor((prev) => !prev)}
            >
              <Image
                src="/icons/diff.svg"
                width={20}
                height={20}
                alt="diff button"
                className="object-contain"
              />
            </button>
          </div>
          <div className="flex-1">
            {!showDiffEditor ? (
              <Editor
                theme={theme}
                language={selectedFile.language}
                value={content || selectedFile.modifiedContent || ''}
                onChange={handleOnChange}
              />
            ) : (
              <DiffEditor
                original={selectedFile.content || ' '}
                modified={content || ' '}
                language={selectedFile.language}
                theme={theme}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="icons/no-file.svg"
              width={120}
              height={120}
              alt="Illustration for No file selected "
            />
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-400 text-center">
              Please select a file from sidebar to start editing
            </p>
          </div>
        </div>
      )}
    </>
  );
}
