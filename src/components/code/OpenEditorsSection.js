import Image from 'next/image';
import FileButton from '../ui/FileButton';
import SectionHeader from '../ui/SectionHeader';

export default function OpenEditorsSection({
  data,
  selectedFile,
  onClick,
  onClose,
}) {
  return (
    <div className="flex flex-col row-span-2">
      <SectionHeader>Open editors</SectionHeader>
      <div className="flex-1 overflow-y-auto">
        {data.length > 0 ? (
          <div className="flex flex-col overflow-y-auto">
            {data.map((file) => (
              <div
                key={file.relativePath}
                className="ps-2 flex items-center gap-1 w-full"
              >
                <button
                  className="min-w-4 h-4 p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                  title="Close Editor"
                  onClick={() => onClose(file)}
                >
                  <Image
                    src="/icons/close.svg"
                    width={8}
                    height={8}
                    alt="close button"
                  />
                </button>
                <FileButton
                  file={file}
                  onClick={() => onClick(file)}
                  isActive={selectedFile?.relativePath === file.relativePath}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-8">
              <Image
                src="icons/no-file.svg"
                width={32}
                height={32}
                alt="Illustration for No file selected "
              />
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-400 text-center">
                Please select a file from files to start editing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
