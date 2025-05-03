import LoginForm from "./LoginForm";

export default function StudentLogin() {
  return (
    <LoginForm
      title="Wilson Grad Social"
      passwordFieldLabel="OEN"
      onSubmit={({ email, credential: oen }) =>
        console.log("Student login with:", email, oen)
      }
    />
  );
}