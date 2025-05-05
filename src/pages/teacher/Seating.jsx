import { SeatingSelectorProvider } from "../../components/context/SeatingSelectorContext";
import { TablesProvider } from "../../components/context/TablesContext";
import SeatingEditor from "../../components/teacher/seating/SeatingEditor";

export default function Seating() {
  return (
    <SeatingSelectorProvider>
      <TablesProvider>
        <SeatingEditor />
      </TablesProvider>
    </SeatingSelectorProvider>
  );
}
