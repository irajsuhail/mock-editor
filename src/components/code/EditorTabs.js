import FileButton from '../ui/FileButton';
import Image from 'next/image';

export default function EditorTabs({ data, selectedFile, onClick, onClose }) {
  return (
    <div className="flex overflow-x-auto">
      {data &&
        data.map((file) => (
          <div
            key={file.name}
            className={`min-w-max px-3 py-2 flex items-center gap-1 border-e border-gray-20 dark:border-gray-800 ${
              selectedFile.relativePath === file.relativePath
                ? 'bg-blue-50 dark:bg-gray-900'
                : 'hover:bg-blue-100 dark:hover:bg-gray-900 transition'
            }`}
          >
            <FileButton
              file={file}
              onClick={() => onClick(file)}
              isActive={selectedFile?.relativePath === file.relativePath}
            />
            <button
              className="w-4 h-4 p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              onClick={() => onClose(file)}
              title="close editor"
            >
              <Image
                src="/icons/close.svg"
                width={8}
                height={8}
                alt="close button"
              />
            </button>
          </div>
        ))}
    </div>
  );
}
