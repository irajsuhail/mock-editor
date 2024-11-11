import Image from 'next/image';

const iconMapping = {
  python: 'python',
  sql: 'sql',
  markdown: 'markdown',
  gitkeep: 'git',
  gitignore: 'git',
  git: 'git',
  json: 'json',
  yaml: 'yaml',
  default: 'default',
};

function computeClassNames(status) {
  const baseClass =
    'p-0.5 w-full flex items-center justify-between gap-2 text-medium text-sm transition ';

  switch (status) {
    case 'modified':
      return baseClass + 'text-green-800 dark:text-green-500';
    case 'untracked':
      return baseClass + 'text-blue-800 dark:text-blue-500';
    default:
      return baseClass + 'dark:text-gray-300';
  }
}

export default function FileButton({ file, onClick, isActive }) {
  const fileIcon = iconMapping[file.language] || iconMapping.default;
  return (
    <button
      onClick={onClick}
      title={`${file.relativePath}${file.gitStatus ? ' • ' + file.gitStatus : ''}`}
      className={`${computeClassNames(file.gitStatus)} ${isActive ? 'bg-blue-50 dark:bg-gray-900' : ''}`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={`/file-icons/${fileIcon}.svg`}
          alt={`${file.language ? file.language + 'file' : 'unknown file'}`}
          width={16}
          height={16}
        />
        <p className="truncate whitespace-nowrap">{file.name}</p>
      </div>
      <div className="flex items-center justify-center min-w-3 h-3">
        {file.gitStatus && (
          <p className="text-xs font-medium">
            {file.gitStatus.charAt(0).toUpperCase()}
          </p>
        )}
      </div>
    </button>
  );
}
