import LoginForm from "./LoginForm";

export default function TeacherLogin() {
  return (
    <LoginForm
      title="Teacher Dashboard"
      passwordFieldLabel="Password"
      onSubmit={({ email, credential: password }) =>
        console.log("Teacher login with:", email, password)
      }
    />
  );
}