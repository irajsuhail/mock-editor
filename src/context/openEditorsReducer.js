export const OPEN_EDITOR = 'OPEN_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';
export const OPEN_EDITORS = 'OPEN_EDITORS';

export const initialState = {
  openFiles: [],
  selectedFile: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case OPEN_EDITOR:
      if (
        state.openFiles.some(
          (file) => file.relativePath === action.payload.relativePath,
        )
      ) {
        return {
          ...state,
          selectedFile: action.payload,
        };
      }
      return {
        ...state,
        openFiles: [...state.openFiles, action.payload],
        selectedFile: action.payload,
      };

    case CLOSE_EDITOR:
      const updatedFiles = state.openFiles.filter(
        (file) => file.relativePath !== action.payload.relativePath,
      );

      const isSelectedFileClosed =
        state.selectedFile?.relativePath === action.payload.relativePath;
      return {
        ...state,
        openFiles: updatedFiles,
        selectedFile: isSelectedFileClosed
          ? updatedFiles.length > 0
            ? updatedFiles[0]
            : null
          : state.selectedFile,
      };

    case OPEN_EDITORS:
      const newFiles = action.payload.filter(
        (newFile) =>
          !state.openFiles.some(
            (file) => file.relativePath === newFile.relativePath,
          ),
      );

      return {
        ...state,
        openFiles: [...state.openFiles, ...newFiles],
        selectedFile: newFiles.length > 0 ? newFiles[0] : state.selectedFile,
      };

    default:
      return state;
  }
}
