// app/components/BranchSwitcher.js
'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import Image from 'next/image';
import { useBranch } from '@/context/BranchContext';

export default function BranchSwitcher() {
  const { branches, currentBranch, changeBranch, loading, error } = useBranch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <p className="p-2 text-sm font-medium">Loading Branch...</p>;
  }

  const handleBranchChange = (branch) => {
    changeBranch(branch);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="p-2 flex items-center gap-2 text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-900"
        onClick={() => setIsModalOpen(true)}
        title="Switch branch"
      >
        <Image
          src="/icons/branch.svg"
          width={16}
          height={16}
          alt="Switch branch"
        />
        <span>{error ? 'Failed to load, Try again.' : currentBranch}</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className="pb-4 text-lg font-semibold text-black dark:text-gray-200 border-b border-border-dashed border-gray-200 dark:border-gray-900">
          Select a Branch
        </h1>

        <h2 className="text-xs uppercase mt-4 text-gray-400 dark:text-gray-600">
          Local Branches:
        </h2>
        <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-900">
          {branches.localBranches.map((branch) => (
            <li key={branch}>
              <button
                className="text-sm w-full text-black dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-900 rounded-md transition px-3 py-2 text-start"
                onClick={() => handleBranchChange(branch)}
              >
                {branch}
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-xs uppercase mt-4 text-gray-400 dark:text-gray-600">
          Remote Branches:
        </h2>
        <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-900">
          {branches.remoteBranches.map((branch) => (
            <li key={branch}>
              <button
                className="text-sm w-full text-black dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-900 rounded-md transition px-3 py-2 text-start"
                onClick={() => handleBranchChange(branch)}
              >
                {branch}
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
