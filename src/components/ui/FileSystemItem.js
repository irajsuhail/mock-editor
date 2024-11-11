import { useState } from 'react';
import { useOpenEditors } from '@/context/OpenEditorsContext';
import FileButton from './FileButton';
import DirectoryButton from './DirectoryButton';
import useHandleFileButtonClick from '@/hooks/useHandleFileButtonClick';

export default function FilesystemItem({ item }) {
  let [isOpen, setIsOpen] = useState(false);
  const { openEditor, selectedFile } = useOpenEditors();
  const handleFileButtonClick = useHandleFileButtonClick();

  return (
    <li key={item.name} className="list-none">
      <span className="flex items-center gap-2 py-1">
        {item.children && item.children.length > 0 ? (
          <DirectoryButton
            title={item.name}
            onClick={() => setIsOpen((prev) => !prev)}
            isOpen={isOpen}
          />
        ) : (
          <FileButton
            file={item}
            onClick={() => {
              handleFileButtonClick(item);
            }}
            isActive={selectedFile?.relativePath === item.relativePath}
          />
        )}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {item.children?.map((item) => (
            <FilesystemItem item={item} key={item.name} />
          ))}
        </ul>
      )}
    </li>
  );
}
