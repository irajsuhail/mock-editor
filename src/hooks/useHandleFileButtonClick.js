' use client ';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useOpenEditors } from '@/context/OpenEditorsContext';

const useHandleFileButtonClick = () => {
  const [storedWorksheets, setStoredWorksheets] = useLocalStorage(
    'openWorksheets',
    [],
  );
  const { openEditor } = useOpenEditors();

  const handleFileButtonClick = (file) => {
    console.log('stored worksheets', storedWorksheets);
    const hasWorkSheet = storedWorksheets.some(
      (worksheet) => worksheet.relativePath === file.relativePath,
    );

    if (!hasWorkSheet) {
      const updatedStoredWorksheets = [...storedWorksheets, file];
      setStoredWorksheets(updatedStoredWorksheets);
      openEditor({ ...file, content: '', modifiedContent: '' });
    } else {
      const existingWorksheet = storedWorksheets.find(
        (worksheet) => worksheet.relativePath === file.relativePath,
      );
      openEditor(existingWorksheet);
    }
  };

  return handleFileButtonClick;
};

export default useHandleFileButtonClick;
