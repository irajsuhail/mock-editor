import React, { createContext, useContext, useReducer } from 'react';
import {
  reducer,
  initialState,
  OPEN_EDITOR,
  CLOSE_EDITOR,
  OPEN_EDITORS,
} from './openEditorsReducer';

const OpenEditorsContext = createContext();

export const OpenEditorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openEditor = (file) => {
    dispatch({ type: OPEN_EDITOR, payload: file });
  };

  const closeEditor = (file) => {
    dispatch({ type: CLOSE_EDITOR, payload: file });
  };

  const openEditors = (files) => {
    dispatch({ type: OPEN_EDITORS, payload: files });
  };

  return (
    <OpenEditorsContext.Provider
      value={{
        openFiles: state.openFiles,
        selectedFile: state.selectedFile,
        openEditor,
        closeEditor,
        openEditors,
      }}
    >
      {children}
    </OpenEditorsContext.Provider>
  );
};

export const useOpenEditors = () => useContext(OpenEditorsContext);
