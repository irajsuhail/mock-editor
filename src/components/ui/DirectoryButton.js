import Image from 'next/image';
import React from 'react';

export default function DirectoryButton({ title, onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className="p-0.5 w-full flex items-center gap-2 text-black dark:text-gray-200 transition"
    >
      <Image
        src="/icons/chevron-right.svg"
        alt={`${title} directory`}
        width={4}
        height={4}
        className={`${isOpen ? 'rotate-90' : ''} transition-all`}
      />
      <Image
        src="/icons/directory.svg"
        alt={`${title} directory`}
        width={16}
        height={16}
      />
      <p className="text-sm truncate">{title}</p>
    </button>
  );
}
