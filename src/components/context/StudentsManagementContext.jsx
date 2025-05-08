import { createContext, useContext, useState } from 'react';

const StudentsManagementContext = createContext(null);

export function StudentsManagementProvider({ children }) {
  const [selectedUids, setSelectedUids] = useState([]);
  const [newStudentDialogOpen, setNewStudentDialogOpen] = useState(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = useState(false);
  const [csvStudents, setCsvStudents] = useState([]);
  const [deleteStudentsDialogOpen, setDeleteStudentsDialogOpen] = useState(false);

  return (
    <StudentsManagementContext.Provider
      value={{
        selectedUids, setSelectedUids,
        newStudentDialogOpen, setNewStudentDialogOpen,
        deleteStudentsDialogOpen, setDeleteStudentsDialogOpen,
        csvUploadDialogOpen, setCsvUploadDialogOpen,
        csvStudents, setCsvStudents
      }}
    >
      {children}
    </StudentsManagementContext.Provider>
  );
}

export function useStudentsManagement() {
  const context = useContext(StudentsManagementContext);
  if (!context) {
    throw new Error('useStudentsManagement must be used within a StudentsManagementProvider');
  }
  return context;
}
