import { useState } from 'react';
import Modal from './Modal';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function ThemeSwitcher() {
  const { activeTheme, setActiveTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableThemes = ['dark', 'light', 'system'];

  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="p-2 flex items-center gap-2 text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-900"
        onClick={() => setIsModalOpen(true)}
        title="Switch Theme"
      >
        <Image
          src="/icons/theme.svg"
          width={16}
          height={16}
          alt="Switch theme"
        />
        <span>{activeTheme}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className="pb-4 text-lg font-semibold text-black dark:text-gray-200 border-b border-border-dashed border-gray-200 dark:border-gray-900 ">
          Change Theme
        </h1>
        <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-900">
          {availableThemes.map((theme) => (
            <li key={theme}>
              <button
                className="text-sm w-full text-black dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-900 rounded-md transition px-3 py-2 text-start"
                onClick={() => handleThemeChange(theme)}
              >
                {theme}
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
