import TableDialog from "../seating/TableDialog";
import BookingTableDialogActions from "./BookingTableDialogActions";

export default function BookingTableDialog() {
  return <TableDialog dialogActions={<BookingTableDialogActions />} />;
}