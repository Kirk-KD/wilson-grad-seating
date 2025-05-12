import { Alert } from "@mui/material";

export default function LoginErrorAlert({ errorCode }) {
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Your email or password is incorrect.";
      case "auth/too-many-requests":
        return "Too many requests, please slow down.";
      case "auth/user-not-found":
        return "The email doesn't exist."
      case "auth/wrong-password":
        return "The password is incorrect."
      case "is-student":
        return "Please use the student sign-in.";
      case "is-teacher":
        return "Please use the teacher sign-in.";
      default:
        return "An unknown error occurred: " + errorCode;
    }
  };

  return <Alert severity="error">
    {getErrorMessage(errorCode)}
  </Alert>
}