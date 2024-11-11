// app/components/Modal.js
'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const [modalContainer] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.createElement('div');
    }
    return null;
  });

  useEffect(() => {
    if (modalContainer && isOpen) {
      document.body.appendChild(modalContainer);
      return () => {
        document.body.removeChild(modalContainer);
      };
    }
  }, [isOpen, modalContainer]);

  if (!isOpen || !modalContainer) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-950 rounded-lg max-w-sm w-full p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 end-5 w-4 h-4 p-1 rounded-sm hover:bg-blue-50 dark:hover:bg-blue-900"
          onClick={onClose}
        >
          <Image
            src="/icons/close.svg"
            width={8}
            height={8}
            alt="close button"
          />
        </button>
        {children}
      </div>
    </div>,
    modalContainer,
  );
};

export default Modal;
