import { TablesProvider } from "../../context/TablesContext";
import SeatingDisplay from "../../seating/SeatingDisplay";
import TableChip from "../../seating/TableChip";

export default function ReadOnlySeatLayout() {
  return (
    <TablesProvider>
      <SeatingDisplay 
        renderTable={tableId => <TableChip tableId={tableId} onClick={id => {}} />}
      />
    </TablesProvider>
  );
}