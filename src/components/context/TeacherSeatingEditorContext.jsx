import { createContext, useContext, useState } from 'react';

const TeacherSeatingEditorContext = createContext(null);

export function TeacherSeatingEditorProvider({ children }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  return (
    <TeacherSeatingEditorContext.Provider
      value={{
        openAssignDialog,
        setOpenAssignDialog,
        selectedStudent,
        setSelectedStudent
      }}
    >
      {children}
    </TeacherSeatingEditorContext.Provider>
  );
}

export function useTeacherSeatingEditor() {
  const context = useContext(TeacherSeatingEditorContext);
  if (!context) {
    throw new Error('useTeacherSeatingEditor must be used within a TeacherSeatingEditorProvider');
  }
  return context;
}
