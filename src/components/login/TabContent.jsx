import StudentLogin from "./StudentLogin.jsx";
import TeacherLogin from "./TeacherLogin";

export default function TabContent({ isTeacher }) {
  if (isTeacher) return <TeacherLogin />
  else return <StudentLogin />
}