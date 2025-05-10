import { createContext, useContext, useState } from 'react';
import { useWhitelist } from '../../hooks/useWhitelist';

const StudentsManagementContext = createContext(null);

export function StudentsManagementProvider({ children }) {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [newStudentDialogOpen, setNewStudentDialogOpen] = useState(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = useState(false);
  const [csvStudents, setCsvStudents] = useState([]);
  const [deleteStudentsDialogOpen, setDeleteStudentsDialogOpen] = useState(false);
  const whitelist = useWhitelist();

  return (
    <StudentsManagementContext.Provider
      value={{
        selectedStudents, setSelectedStudents,
        newStudentDialogOpen, setNewStudentDialogOpen,
        deleteStudentsDialogOpen, setDeleteStudentsDialogOpen,
        csvUploadDialogOpen, setCsvUploadDialogOpen,
        csvStudents, setCsvStudents,
        whitelist
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
