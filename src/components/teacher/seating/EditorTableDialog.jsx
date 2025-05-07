import EditorTableDialogActions from "./EditorTableDialogActions";
import TableDialog from "./TableDialog";

export default function EditorTableDialog() {
  return (<TableDialog dialogActions={ <EditorTableDialogActions /> }/>);
}