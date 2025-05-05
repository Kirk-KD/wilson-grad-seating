import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";

export default function ReadOnlySeatLayout() {
  return (
    <SeatingDisplay 
      renderTable={tableId => <TableChip tableId={tableId} onClick={id => {}} />}
    />
  );
}