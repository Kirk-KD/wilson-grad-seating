import TableDialog from "../../seating/TableDialog";
import EditorTableDialogActions from "./EditorTableDialogActions";

export default function EditorTableDialog() {
  return (<TableDialog dialogActions={ <EditorTableDialogActions /> }/>);
}